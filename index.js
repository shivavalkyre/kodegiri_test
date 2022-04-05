const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const logger = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin','*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

app.use(cors())
app.use(logger('dev'));


const part1 = require('./part1')
app.post('/api/number',part1.readNumber);

// Guest Part ==============================================================================

const part2_1_2 = require('./part2_1_2')
app.post('/api/guestbook',part2_1_2.create_guest);
app.get('/api/guestbook',part2_1_2.read_guest);

// Admin Part ==============================================================================

const part2_1_3 = require ('./part2_1_3')
app.post('/api/admin',part2_1_3.create_admin)
app.post('/api/admin/login',part2_1_3.login_admin)
app.post('/api/admin/guestbook',authenticateToken,(req,res) => {
    part2_1_3.create_guest(req,res);
});
app.get('/api/admin/guestbook',authenticateToken,(req,res) => {
    part2_1_3.read_guest(req,res);
});
app.get('/api/admin/guestbook/:id',authenticateToken,(req,res) => {
    part2_1_3.read_guest_by_id(req,res);
});
app.put('/api/admin/guestbook/:id',authenticateToken,(req,res) => {
    part2_1_3.update_guest(req,res);
});
app.delete('/api/admin/guestbook/:id',authenticateToken,(req,res) => {
    part2_1_3.delete_guest(req,res);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).json({success:false,data:'Unauthorize'})
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
  
      next() // continuamos
  } catch (error) {
      res.status(400).json({success:false,data: 'token not valid'})
  }
  
  }


// ==============================================================================
app.get("/", (req, res) => {
    res.send({
        message: "🚀 API Kodegiri"
    });
});

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
