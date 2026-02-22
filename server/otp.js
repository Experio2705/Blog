import express from 'express'
import { Resend } from 'resend'

const router = express.Router()
const resend = new Resend(process.env.RESEND_API_KEY)

const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000)
}

let otpStore = {}

router.post('/set-otp', async (req, res) => {
    console.log("SET OTP HIT")

    const { email } = req.body

    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }

    const otp = generateOtp()

    otpStore[email] = {
        otp,
        expire: Date.now() + 5 * 60 * 1000
    }

    try {
        await resend.emails.send({
            from: 'blogapppr@gmail.com', 
            to: email,
            subject: 'OTP Verification',
            html: `<h2>Your OTP is: ${otp}</h2>`
        })

        console.log("Email sent via Resend")

        res.json({ message: "OTP sent successfully!" })

    } catch (err) {
        console.error("Resend error:", err)
        res.status(500).json({ message: "Failed to send OTP" })
    }
})

router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body

    if (!email || !otp) {
        return res.status(400).json({ message: "Missing email or OTP" })
    }

    const checkotp = otpStore[email]

    if (!checkotp || checkotp.otp != otp) {
        return res.json({ message: "invalid" })
    }

    if (Date.now() > checkotp.expire) {
        delete otpStore[email]
        return res.json({ message: "expired" })
    }

    delete otpStore[email]

    res.json({ message: "verified" })
})

export default router