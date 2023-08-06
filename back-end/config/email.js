const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER, // gmail 주소 적어야 함.
        pass: process.env.EMAIL_PASS // 앱 비밀번호 자리
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports={ smtpTransport }