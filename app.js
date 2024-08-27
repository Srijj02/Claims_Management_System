const express=require('express');
const mysql=require('mysql2');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const app=express();
app.use(cors());

const {
    userDB,
    authenticateToken,
    // authorizeRole,
    secretKey
}=require('./auth')


app.use(cookieParser());




app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));




const port=process.env.PORT || 3000

//users

app.get('/users',authenticateToken,(req,res)=>{
    const query='SELECT * FROM users_table';
    userDB.query(query,(err,result)=> {
        if(err) {
            console.error(err);
        }
        else {
            res.json(result);
        }
    })
})

app.post('/users',async(req,res)=> {
    const { fullName, userName, userPassword,userRole }=req.body;

    console.log("in users");

    const hashedPassword=await bcrypt.hash(userPassword,10);
    console.log("hello after hash");
    const query='INSERT INTO users_table(fullName,userName,userPassword,userRole) VALUES(?,?,?,?)';
    console.log("hello after query");
    userDB.query(query,[fullName,userName,hashedPassword,userRole],(err,result)=> {
        console.log("in users1");
        if(err) {
            console.error(err);
        }
        else {
            res.json({
                id:result.insertId,
                fullName,
                userName,
                userPassword,
                userRole
            });
        }
    });
});


app.put('/users/:id',authenticateToken,(req,res)=> {
    const {id} =req.params;
    const {fullName,userName,userPassword,userRole}=req.body;


    const query='UPDATE users_table SET fullName=?,userName=?,userPassword=?,userRole=? WHERE id=?';

    userDB.query(query,[fullName,userName,userPassword,userRole,id],(err,result)=> {
        if(err) {
            console.error(err);
        }
        else {
            res.json(result);
        }
    })

})

app.delete('/users/:id',authenticateToken,(req,res)=> {
    const {id}=req.params;
    const query='DELETE FROM users_table WHERE id=?';

    userDB.query(query,[id],(err,result)=> {
        if(err) {
            console.error(err);
        }
        else {
            res.json(result);
        }
    })
})

//login page
app.post('/login',(req,res)=> {
    const {userName,userPassword} = req.body;
    console.log(userName+" "+userPassword);

    console.log("eee");
    const query='SELECT * FROM users_table WHERE userName=?';
    userDB.query(query,[userName],(err,result)=> {
        if(err) {
            console.error(err);
            console.log("in query");
            return res.status(500).json({
                error:'userDB error'
            })
        }
        if(result.length===0){
            return res.status(401).json({
                message:'Invalid credentials'
            })
        }
        const user=result[0];

        console.log("kkjxsjh");

        bcrypt.compare(userPassword,user.userPassword,(err,isMatch)=> {
            console.log(userPassword);
            console.log(user.userPassword);
            if(err) {
                return res.status(500).json({
                    error:'server side error',
                })
            }

            if(!isMatch) {
                return res.status(401).json({
                    message:'Invalid credentials'
                })
            }

            console.log("hey");
            const token = jwt.sign({userName:user.userName,userRole:user.userRole},secretKey,{expiresIn:'2h'});

            res.cookie('token',token);

            res.json({
                message:"login sucessfully",
                role:user.userRole
            })

        })
    })
})





//claims

const claimsDB=mysql.createConnection({
    database:'claims',
    user:'root',
    password:'1234',
    host:'localhost'
})

claimsDB.connect((err)=> {
    if(err) {
        console.log('error in connecting');
    }
    else {
        console.log('connection established');
    }
})

app.get('/claims',authenticateToken,(req,res)=> {
    const query="SELECT * FROM claims_table";

    claimsDB.query(query,(err,result)=> {
        if(err) {
            console.error(err);
            res.status(500).json({
                error: 'failed to fetch data'
            })
        }
        else {
            res.json(result);
        }
    })
})

app.get('/claims/:id',authenticateToken,(req,res)=> {
    const {id}=req.params;
    
    const query="SELECT * FROM claims_table WHERE id=?"
    claimsDB.query(query,[id],(err,result)=> {
        if(err) {
            console.error(err);
            res.status(500).json({
                error:'failed to fetch the data'
            })
        }
        else {
            res.json(result);
        }
    })

})

//-- id, bill_number, customer_id, bill_date, amount, status, payment_due_date, payment_method

app.post('/claims',(req,res)=> {
    
    const { bill_number,customer_id,bill_date,amount,status,payment_due_date,payment_method }=req.body;
    console.log("hello"+bill_date);
    const query='INSERT INTO claims_table(bill_number,customer_id,bill_date,amount,status,payment_due_date,payment_method) VALUES(?,?,?,?,?,?,?)';
    claimsDB.query(query,[bill_number,customer_id,bill_date,amount,status,payment_due_date,payment_method],(err,result)=> {
        console.log(bill_date);
        if(err) {
            console.error(err);
            res.status(500).json({
                error:'failed to fetch data'
            })
        }
        else {

            console.log("hi"+bill_date);
            
            res.status(201).json({
                id:result.insertId,
                bill_number,
                customer_id,
                bill_date,
                amount,
                status,
                payment_due_date,
                payment_method
            });
        }
    })
})

app.put('/claims/:id',authenticateToken,(req,res)=> {

    const {id}=req.params;
    const { bill_number,customer_id,bill_date,amount,status,payment_due_date,payment_method }=req.body;

    console.log("in app.js"+bill_date);

    const query='UPDATE claims_table SET bill_number=?,customer_id=?,bill_date=?,amount=?,status=?,payment_due_date=?,payment_method=? WHERE id=?';

    claimsDB.query(query,[bill_number,customer_id,bill_date,amount,status,payment_due_date,payment_method,id],(err,result)=> {
        if(err) {
            console.error(err);
            res.status(500).json({
                error:'failed to update data'
            })
        }
        else {
            res.json({
                messege:'successfully updated'
            })
        }
    })
})

app.delete('/claims/:id',authenticateToken,(req,res)=> {
    const {id}=req.params;
    const query='DELETE FROM claims_table WHERE id=?';

    claimsDB.query(query,[id],(err,result)=> {
        if(err) {
            console.error(err);
            res.status(500).json({
                error:'error in feching'
            })
        }
        else {
            res.json({
                messege:'successfully deleted'
            })
        }
    })
    
})

app.listen(port,()=> {
    console.log(`listening at port number ${port}`);
})


