// import express from 'express';
// import nodemailer from 'nodemailer';

// const app=express.Router();
// const generateOtp=()=>{
//     return Math.floor(1000+Math.random()*9000);
// }
// let otpStore={};
// app.post('/set-otp',async(req,res)=>{
//     console.log("SET OTP HIT")
//     const {email}=req.body;
//     const otp=generateOtp();
//     otpStore[email]={
//         otp,
//         expire:Date.now()+50*60*1000
//     }

//     const transport=nodemailer.createTransport({
//         service:"gmail",
//         port: 587,
//         secure: false,

//         auth:{
//             user:"blogapppr@gmail.com",
//             pass:process.env.EMAIL_PASS            
//         }
//     });
//     try{
//         await transport.sendMail({
//             from:'blogapppr@gmail.com',
//             to:email,
//             subject:'blog Otp Verification',
//             text:`Your Otp is ${otp}`
//         })
//         res.json({ message: "OTP sent successfully !" });
//     }
//     catch(err){
//         console.log(err);
//     }
// })

// app.post('/verify-otp',(req,res)=>{
//     const {email,otp}=req.body;
//     const checkotp=otpStore[email];
//     if(!checkotp || checkotp.otp!=otp){
//         return res.json({message:'invald'});
//     }
//     if (Date.now() > checkotp.expire) {
//         delete otpStore[email];
//         return res.json({ message: "expired" });
//     }
//     delete otpStore[email];

//     res.json({message:'verified'})
// });
// const PORT=process.env.PORT||8800;

// export default app
import express from "express";
import axios from "axios";

const app = express.Router();

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

let otpStore = {};

app.post("/set-otp", async (req, res) => {
  console.log("SET OTP HIT");

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const otp = generateOtp();

  otpStore[email] = {
    otp,
    expire: Date.now() + 5 * 60 * 1000, // 5 minutes
  };

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Blog App",
          email: "blogapppr@gmail.com", // must be verified in Brevo
        },
        to: [{ email }],
        subject: "Blog OTP Verification",
        htmlContent: `
          <h2>Your OTP is:</h2>
          <h1 style="color:#4CAF50;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({ message: "OTP sent successfully!" });

  } catch (err) {
    console.error("Brevo Error:", err.response?.data || err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const checkotp = otpStore[email];

  if (!checkotp || checkotp.otp != otp) {
    return res.json({ message: "invalid" });
  }

  if (Date.now() > checkotp.expire) {
    delete otpStore[email];
    return res.json({ message: "expired" });
  }

  delete otpStore[email];

  res.json({ message: "verified" });
});
console.log(process.env.BREVO_API_KEY);
export default app;