import express from "express"
import mysql from "mysql2"
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const app=express();
app.use(cors({
  origin: "https://blog-epla.vercel.app",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
app.options('*', cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err=>{
  if(err) console.log("DB ERROR:", err);
  else console.log("DB CONNECTED");
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Backend is running fine");
});

app.post("/Register",(req,res)=>{
    const sql="INSERT INTO userauth(username,email,password) VALUES(?,?,?)";
    const {username,email,password}=req.body;
    console.log(req.body);
    db.query(sql,[username,email,password],(err,data)=>{
        if(err) return res.send(err);
        return res.json(data);
    });
});

app.post("/Login",(req,res)=>{
    const {email , password}=req.body;
    const sql="SELECT * FROM userauth WHERE email=? AND password=?";
    db.query(sql,[email,password],(err,data)=>{
        if(err) console.log(err);
        if(data.length>0){
            const user = data[0];
            res.json({
            email: user.email,
            username: user.username,
                needsInfo: !user.bio || user.bio.trim() === ""
            });
        }
        else
            res.json({message:"Invalid Credentials!"});
    })
})
app.post('/Info',(req,res)=>{
    const {bio,address,phone,skills,email}=req.body;
    const sql='UPDATE userauth SET bio=?,address=?,phone=?,skills=? WHERE email=?';
    db.query(sql,[bio,address,phone,skills,email],(err,data)=>{
        if(err) console.log(err);
        res.json(data);
    })
})

app.post("/CreateBlog",upload.single("image") ,(req,res)=>{
    const{title,category,description,content,userEmail,userName}=req.body;
    const sql="INSERT INTO blogdata(title,category,description,image,content,userEmail,username,likes) Values(?,?,?,?,?,?,?,?)";
    const imagePath=req.file.path;
    db.query(sql,[title,category,description,imagePath,content,userEmail,userName,0],(err,data)=>{
        if(err) console.log(err);
        return res.json(data);
    })
})
app.get("/Home", (req, res) => {
    const id = req.query.id;
    const sql = "SELECT * FROM blogdata WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) console.log(err);
            res.json(data[0]);
            });
        });

app.post("/Home/Like",(req,res)=>{
    const {id,userEmail}=req.body;
    const sql='select likes,likedby from blogdata where id=? '
    db.query(sql,[id],(err,data)=>{
        if(err) console.log(err);
        let {likes,likedby}=data[0];
        let likedusers=likedby ? likedby.split(","):[];
        if(likedusers.includes(userEmail)){
            likedusers=likedusers.filter(email => email !== userEmail);
            likes-=1;
        }
        else{
            likedusers.push(userEmail);
            likes+=1;
        }
        const updatesql='UPDATE blogdata SET likes=?,likedby=? where id=?';
        db.query(updatesql,[likes,likedusers.join(","),id],(err,result)=>{
            if(err) console.log(err);
            res.json({
                liked: likedusers.includes(userEmail),
                likes
            });
        })
    })
})
app.post("/Home/Save",(req,res)=>{
    const {blog_id,blog_title,userEmail}=req.body;
    const sql="SELECT 1 from saved WHERE blog_id=? AND mail=?";
    db.query(sql,[blog_id,userEmail],(err,data)=>{
        if(err) console.log(err);
        if(data.length>0){
            const deletesql="Delete FROM saved WHERE blog_id=? AND mail=?";
            db.query(deletesql,[blog_id,userEmail],(err,del)=>{
                if(err) console.log(err);
                res.json({saved:false});
            })
        }
        else{
            const insertsql="INSERT INTO saved(blog_id,blog_title,mail) VALUE(?,?,?)";
            db.query(insertsql,[blog_id,blog_title,userEmail],(err,ins)=>{
                if(err) console.log(err);
                res.json({saved:true});
            })
        }
    })
})
app.get("/Home/SavedStatus", (req, res) => {
  const { blog_id, userEmail } = req.query;

  const sql =
    "SELECT 1 FROM saved WHERE blog_id = ? AND mail = ?";

  db.query(sql, [blog_id, userEmail], (err, rows) => {
    if (err) return res.status(500).json(err);

    res.json({ saved: rows.length > 0 });
  });
});
app.get("/latestBlog", (req, res) => {
    const sql = `SELECT * FROM blogdata ORDER BY created_at DESC LIMIT 1`;
    db.query(sql, (err, data) => {
        if (err) console.log(err);
        if (data.length === 0) {
            console.log(res.json(null));
        }
        res.json(data[0]);
  });
});
app.post("/Contact",(req,res)=>{
    const{username,name,surname,email,phone,subject,message}=req.body;
    const sql='INSERT INTO complaints(username,name,surname,email,phone,subject,message) VALUES(?,?,?,?,?,?,?)';
    db.query(sql,[username,name,surname,email,phone,subject,message],(err,data)=>{
        if(err) console.log(err);
        res.json(data);
    })
})
app.post("/Profile",(req,res)=>{
    const {useremail}=req.body;
      const sql = `
        SELECT 
            u.username,
            u.email,
            u.bio,
            u.address,
            b.title,
            b.id

            FROM userauth u
            LEFT JOIN blogdata b
            ON u.email = b.userEmail
            WHERE u.email = ?
  `;
    db.query(sql,[useremail],(err,data)=>{
        if(err) console.log(err);
        res.json(data);
    })
})
app.post("/Saved",(req,res)=>{
    const {useremail}=req.body;
    const sql="SELECT * FROM saved WHERE mail=?";
    db.query(sql,[useremail],(err,data)=>{
        if(err) console.log(err);
        res.json(data);
    })
})
app.get('/Category',(req,res)=>{
    const {search,select}=req.query;
    let sql = "SELECT * FROM blogdata WHERE 1=1";
    let values = [];
    if (search) {
        sql += " AND title LIKE ?";
        values.push(`%${search}%`);
        }
    if (select) {
        sql += " AND category = ?";
        values.push(select);
        }
    db.query(sql,values,(err,data)=>{
        if(err) console.log(err);
        res.json(data);
    })
})
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});