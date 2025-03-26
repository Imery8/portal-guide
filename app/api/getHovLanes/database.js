import mysql from 'mysql2/promise';

export default async function query(location){
      try {
        const mysql = require('mysql2');

        const connection = mysql.createConnection({
            host: '129.7.84.135',
            port: '3306',
            user: 'sens25g3',
            password: 'Sce3027193!!',
            database: 'sens25g3',
            connectTimeout: 10000
        }).promise();
        const lat = location.latitude;
        const lng = location.longitude;
        console.log(lat,lng);
        var qry = `CALL coordinate_comparison(${lat},${lng}, 3);`;
        const [result] = await connection.query(qry);
        console.log("DB CONNECTION ESTABLISHED")
        console.log(result);
        connection.end();
        return result;
      }catch(err){
        console.log(err);
      }
    }
