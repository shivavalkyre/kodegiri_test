const { Pool } = require('pg');

    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'guestbook',
        password: '2020@artadb',
        port: 5432
    });
    
    module.exports = {
        query: (text, params,results) => pool.query(text, params,results)
      }