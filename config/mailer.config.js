const nodemailer = require('nodemailer');
const template = require('./mailtemplate');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASSWORD
    }
})

module.exports.sendActivationEmail = (email, token) => {
    transporter.sendMail({
        from: `Example name <${process.env.NM_USER}>`,
        to: email,
        subject: "Thanks for joining us",
        html: template.generateEmail(token)
    })
}