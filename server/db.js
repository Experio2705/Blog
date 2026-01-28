import express from "express"
import mysql from "mysql2"
import cors from "cors";
const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"experio",
    database:"blog",
});
db.connect(err=>{
  if(err) console.log("DB ERROR:", err);
  else console.log("DB CONNECTED");
});

app.get("/", (req, res) => {
  res.send("Backend is running fine");
});

app.post("/Register",(req,res)=>{
    const sql="INSERT INTO userAuth(username,email,password) VALUES(?,?,?)";
    const {username,email,password}=req.body;
    console.log(req.body);
    db.query(sql,[username,email,password],(err,data)=>{
        if(err) return res.send(err);
        return res.json(data);
    });
});

app.post("/Login",(req,res)=>{
    const {email , password}=req.body;
    const sql="SELECT * FROM userAuth WHERE email=? AND password=?";
    db.query(sql,[email,password],(err,data)=>{
        if(err) console.log(err);
        if(data.length>0)
            res.json(data[0]);
        else
            res.json({message:"Invalid Credentials!"});
    })
})
app.listen(8800,()=>{
    console.log("Connected to backend fine.");
})