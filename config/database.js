const sql = require('mysql2');

const db=sql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});
db.getConnection((e,connection)=>{
    if(e){
        console.error('DB connection error:',err);
    }
    else{
        console.log('connected to sql');
        connection.release();
    }
});

module.exports=db;