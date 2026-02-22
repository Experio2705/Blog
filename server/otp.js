import express from 'express';
import nodemailer from 'nodemailer';

const app=express.Router();
const generateOtp=()=>{
    return Math.floor(1000+Math.random()*9000);
}
let otpStore={};
app.post('/set-otp',async(req,res)=>{
    const {email}=req.body;
    const otp=generateOtp();
    otpStore[email]={
        otp,
        expire:Date.now()+50*60*1000
    }

    const transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"blogapppr@gmail.com",
            pass:process.env.EMAIL_PASS            
        }
    });
    try{
        await transport.sendMail({
            from:'blogapppr@gmail.com',
            to:email,
            subject:'blog Otp Verification',
            text:`Your Otp is ${otp}`
        })
        res.json({ message: "OTP sent successfully !" });
    }
    catch(err){
        console.log(err);
    }
})

app.post('/verify-otp',(req,res)=>{
    const {email,otp}=req.body;
    const checkotp=otpStore[email];
    if(!checkotp || checkotp.otp!=otp){
        return res.json({message:'invald'});
    }
    if (Date.now() > checkotp.expire) {
        delete otpStore[email];
        return res.json({ message: "expired" });
    }
    delete otpStore[email];

    res.json({message:'verified'})
});
const PORT=process.env.PORT||8800;

export default app