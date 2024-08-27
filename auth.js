const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const mysql=require('mysql2');
const cors=require('cors');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');

const secretKey='secret_key';

const app=express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const userDB=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'users'
})

userDB.connect((err)=> {
    if(err) {
        console.error(err);
    }
    else {
        console.log('connection established');
    }
})


const authenticateToken = (req,res,next)=> {
    const token=req.cookies.token;

    console.log(token);

    if(token) {
        jwt.verify(token,secretKey,(err,decoded)=> {
            if(err) {
                return res.status(402).json({
                    message:'invalid or expired'
                })
            }
            req.user=decoded;
            next();
        });
    }
    else {
        res.status(401).json({
            message:'No token provided'
        })
    }

}




// const authorizeRole=(roles)=> {
//     return (req,res,next)=> {
//         if(roles.includes(req.user.userRole)){
//             next();
//         }
//         else {
//             res.status(403).json({
//                 message:'errorn in role'
//             })
//         }
//     }
// }


module.exports= {
    userDB,
    authenticateToken,
    // authorizeRole,
    secretKey
}



