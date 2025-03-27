import mysql from 'mysql2/promise';

const host_db = process.env.NEXT_PUBLIC_HOST;
const port_db = process.env.NEXT_PUBLIC_PORT;
const user_db = process.env.NEXT_PUBLIC_USER;
const password_db = process.env.NEXT_PUBLIC_PSWD;
const database_db = process.env.NEXT_PUBLIC_DB;



export default async function query(location){
      try {
        const mysql = require('mysql2');

        const connection = mysql.createConnection({
<<<<<<< HEAD
            host: host_db,
            port: port_db,
            user: user_db,
            password: password_db,
            database: database_db,
=======
            host: '',
            port: '',
            user: '',
            password: '',
            database: '',
>>>>>>> 99020b48cffd05a3035e7483cf74a7f2030317dd
            connectTimeout: 10000
        }).promise();
        const lat = location.latitude;
        const lng = location.longitude;
        console.log(lat,lng);
        var qry = `CALL coordinate_comparison(${lat},${lng}, 3);`;
        const [result] = await connection.query(qry);
        console.log("DB CONNECTION ESTABLISHED")
        console.log(result);
        connection.close();
        return result;
      }catch(err){
        console.log(err);
      }
    }
