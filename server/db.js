import express from "express"
import cors from "cors"
import multer from "multer"
import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"
import otpRoutes from "./otp.js"

dotenv.config()

const app = express()

app.use(cors({
  origin: "https://blog-epla.vercel.app",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}))
app.options(/.*/, cors())

app.use(express.json())
app.use('/', otpRoutes)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const upload = multer({
  storage: multer.memoryStorage(),
})

app.get("/", (req, res) => {
  res.send("Backend is running fine")
})

app.post("/Register", async (req,res)=>{
  const {username,email,password}=req.body
  const { data, error } = await supabase
    .from("userauth")
    .insert([{ username,email,password }])
  if(error) return res.send(error)
  res.json(data)
})

app.post("/Login", async (req,res)=>{
  const {email , password}=req.body
  const { data, error } = await supabase
    .from("userauth")
    .select("*")
    .eq("email", email)
    .eq("password", password)

  if(error) return res.json(error)

  if(data.length>0){
    const user = data[0]
    res.json({
      email: user.email,
      username: user.username,
      needsInfo: !user.bio || user.bio.trim() === ""
    })
  } else {
    res.json({message:"Invalid Credentials!"})
  }
})

app.post('/Info', async (req,res)=>{
  const {bio,address,phone,skills,email}=req.body
  const { data, error } = await supabase
    .from("userauth")
    .update({ bio,address,phone,skills })
    .eq("email", email)

  if(error) return res.json(error)
  res.json(data)
})

app.post("/CreateBlog", upload.single("image"), async (req,res)=>{
  try{
    const{title,category,description,content,userEmail,userName}=req.body

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" })
    }

    const fileName = `${Date.now()}-${req.file.originalname}`

    const { error: uploadError } = await supabase.storage
      .from("image")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype
      })

    if(uploadError) return res.status(500).json(uploadError)

    const { data: publicUrlData } = supabase
      .storage
      .from("image")
      .getPublicUrl(fileName)

    const imageUrl = publicUrlData.publicUrl

    const { data, error } = await supabase
      .from("blogdata")
      .insert([{
        title,
        category,
        description,
        image: imageUrl,
        content,
        userEmail,
        username: userName,
        likes: 0
      }])

    if(error) return res.json(error)

    res.json(data)
  }
  catch(err){
    res.status(500).json(err)
  }
})

app.get("/Home", async (req, res) => {
  const id = req.query.id

  const { data, error } = await supabase
    .from("blogdata")
    .select("*")
    .eq("id", id)
    .single()

  if(error) return res.json(error)
  res.json(data)
})

app.post("/Home/Like", async (req,res)=>{
  const {id,userEmail}=req.body

  const { data, error } = await supabase
    .from("blogdata")
    .select("likes,likedby")
    .eq("id", id)
    .single()

  if(error) return res.json(error)

  let {likes,likedby} = data
  let likedusers = likedby ? likedby.split(",") : []

  if(likedusers.includes(userEmail)){
    likedusers = likedusers.filter(email => email !== userEmail)
    likes -= 1
  } else {
    likedusers.push(userEmail)
    likes += 1
  }

  const { error: updateError } = await supabase
    .from("blogdata")
    .update({
      likes,
      likedby: likedusers.join(",")
    })
    .eq("id", id)

  if(updateError) return res.json(updateError)

  res.json({
    liked: likedusers.includes(userEmail),
    likes
  })
})

app.post("/Home/Save", async (req,res)=>{
  const {blog_id,blog_title,userEmail}=req.body

  const { data } = await supabase
    .from("saved")
    .select("*")
    .eq("blog_id", blog_id)
    .eq("mail", userEmail)

  if(data.length>0){
    await supabase
      .from("saved")
      .delete()
      .eq("blog_id", blog_id)
      .eq("mail", userEmail)

    res.json({saved:false})
  } else {
    await supabase
      .from("saved")
      .insert([{ blog_id, blog_title, mail: userEmail }])

    res.json({saved:true})
  }
})

app.get("/Home/SavedStatus", async (req, res) => {
  const { blog_id, userEmail } = req.query

  const { data } = await supabase
    .from("saved")
    .select("*")
    .eq("blog_id", blog_id)
    .eq("mail", userEmail)

  res.json({ saved: data.length > 0 })
})

app.get("/latestBlog", async (req, res) => {
  const { data, error } = await supabase
    .from("blogdata")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)

  if(error) return res.json(error)
  res.json(data[0] || null)
})

app.post("/Contact", async (req,res)=>{
  const{username,name,surname,email,phone,subject,message}=req.body

  const { data, error } = await supabase
    .from("complaints")
    .insert([{ username,name,surname,email,phone,subject,message }])

  if(error) return res.json(error)
  res.json(data)
})

app.post("/Profile", async (req,res)=>{
  const {useremail}=req.body

  const { data, error } = await supabase
    .from("userauth")
    .select(`
      username,
      email,
      bio,
      address,
      blogdata (
        title,
        id
      )
    `)
    .eq("email", useremail)

  if(error) return res.json(error)
  res.json(data)
})

app.post("/Saved", async (req,res)=>{
  const {useremail}=req.body

  const { data, error } = await supabase
    .from("saved")
    .select("*")
    .eq("mail", useremail)

  if(error) return res.json(error)
  res.json(data)
})

app.get('/Category', async (req,res)=>{
  const {search,select}=req.query

  let query = supabase.from("blogdata").select("*")

  if(search){
    query = query.ilike("title", `%${search}%`)
  }

  if(select){
    query = query.eq("category", select)
  }

  const { data, error } = await query

  if(error) return res.json(error)
  res.json(data)
})

const PORT = process.env.PORT || 8800
app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})