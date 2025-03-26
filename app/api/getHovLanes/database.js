import mysql from 'mysql2/promise';

export default async function query(location){
      try {
        const mysql = require('mysql2');

        const connection = mysql.createConnection({
            host: process.env.HOST,
            port: process.env.PORT,
            user: process.env.USER,
            password: process.env.PSWD,
            database: process.env.DB,
            connectTimeout: 10000
        }).promise();
        const lat = location.latitude;
        const lng = location.longitude;
        console.log(lat,lng);
        var qry = `CALL coordinate_comparison(${lat},${lng}, 3);`;
        const [result] = await connection.query(qry);
        console.log(result);
        return result;
      }catch(err){
        console.log(err);
      }
    }
