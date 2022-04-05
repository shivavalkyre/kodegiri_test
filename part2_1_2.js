
const pool = require('./dbCon');

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
  
     var sql= 'SELECT name,note FROM tbl_guestbook where is_delete=false ORDER BY id ASC'
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



module.exports = {
   create_guest,
   read_guest
}