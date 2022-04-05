const pool = require('./dbCon');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const crypto = require('crypto');
const dbCon = require('./dbCon');
const jwt = require('jsonwebtoken');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;

const create_admin = (request, response) => {
    const { username,password,re_password } 
    = request.body

    if (password == re_password) {
        const saltRounds = 10;
        const hash_password='';
        
        bcrypt.hash(password, saltRounds, (err, hash) => {
            var sql= 'INSERT INTO tbl_user (username,password) VALUES($1,$2) RETURNING id';  
            pool.query(sql, [username,hash], (error, results) => { 
            if (error) {
                 throw error
                response.status(201).send(error)
            }

            response.status(200).send({success:true,data: results.rows[0].id, msg: 'admin data created'})

          })

        });
    
    }

}

const login_admin = (request, response) => {
    const { username, password } = request.body;
    dbCon.query('SELECT * FROM tbl_user WHERE username = $1',[username], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount >0 ){
            if (results.rows[0].is_delete == false){
         
                    bcrypt.compare(password, results.rows[0].password, function(err, res) {
                        if (res==true)
                        {
                        const validPassword = true
                        if (validPassword){
                                if (results.rows.length>0){
                                    var myid = String(results.rows[0].id)
                                    const token = generateAccessToken({ username: request.body.username });
                                    console.log(token);
                                    response.status(200).json( {"token":token,"id" : myid,"username" : request.body.username})
                                }
                            }
                        }
                    });
			}
		}
	});
}




const create_guest = (request, response) => {

    const { name, address,phone,note } 
    = request.body

    var sql= 'INSERT INTO tbl_guestbook (name,address,phone,note) VALUES($1,$2,$3,$4) RETURNING id';  
              pool.query(sql, [name,address,phone,note], (error, results) => { 
              if (error) {
                   throw error
                  response.status(201).send(error)
              }

              response.status(200).send({success:true,data: results.rows[0].id, msg: 'guestbook data created'})

            })




}


const read_guest = (request, response) => {
    var res = []
    var items = []

    //var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    //console.log(fullUrl);


    pool.query('SELECT count(*) as total FROM tbl_guestbook where is_delete=false', (error, results) => {
      if (error) {
        throw error
      }
     //console.log(results.rows[0].total)
     res.push({total:results.rows[0].total})
  
     var sql= 'SELECT * FROM tbl_guestbook where is_delete=false ORDER BY id ASC'
     pool.query(sql ,(error, results) => {
       if (error) {
         throw error
       }
       items.push({rows:results.rows})
       res.push(items)
       response.status(200).send({success:true,data:res})
     })
  
    })

}

const read_guest_by_id = (request, response) => {
    const id = parseInt(request.params.id);
    var res = []
    var items = []

    //var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    //console.log(fullUrl);


    pool.query('SELECT count(*) as total FROM tbl_guestbook where is_delete=false AND id=$1',[id], (error, results) => {
      if (error) {
        throw error
      }
     //console.log(results.rows[0].total)
     res.push({total:results.rows[0].total})
  
     var sql= 'SELECT * FROM tbl_guestbook where is_delete=false AND id=$1 ORDER BY id ASC'
     pool.query(sql,[id] ,(error, results) => {
       if (error) {
         throw error
       }
       items.push({rows:results.rows})
       res.push(items)
       response.status(200).send({success:true,data:res})
     })
  
    })

}


const update_guest = (request, response) => {

    const id = parseInt(request.params.id);
    const { name, address,phone,note } 
    = request.body    

    var sql= 'UPDATE tbl_guestbook set name=$1,address=$2,phone=$3,note=$4 WHERE id=$5 RETURNING id';  
              pool.query(sql, [name,address,phone,note,id], (error, results) => { 
              if (error) {
                   throw error
                  response.status(201).send(error)
              }

              response.status(200).send({success:true,data: results.rows[0].id, msg: 'guestbook data updated'})

            })




}

const delete_guest = (request, response) => {

    const id = parseInt(request.params.id);
    const { name, address,phone,note } 
    = request.body    
    var updated_date = new Date
    var sql= 'UPDATE tbl_guestbook set is_delete=true,update_at=$1 WHERE id=$2 RETURNING id';  
              pool.query(sql, [updated_date,id], (error, results) => { 
              if (error) {
                   throw error
                  response.status(201).send(error)
              }

              response.status(200).send({success:true,data: results.rows[0].id, msg: 'guestbook data updated'})

            })




}
// ======================================== Access token =======================================
function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, {
        expiresIn: '10800s'
    });
}


const checkToken = (request, response) => {
    const { token } = request.body
    var code = 200;
    var success_return = true;
    var data;
    //console.log(token);
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: '1800s'
          } */
          code=400;
          success_return = false;
          //data = err;
      }
          if (code==200){
            response.status(code).send({success:true,data:'token is valid'})
          }else
          {
            response.status(code).send({success:false,data:err})
          }
    });
   
  }

module.exports = {
    create_admin,
    login_admin,
    create_guest,
    read_guest,
    read_guest_by_id,
    update_guest,
    delete_guest,
 }