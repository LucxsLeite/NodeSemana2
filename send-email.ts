import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

const options = {
    from: 'Lucas Leite <lucasla@id.uff.br>',
    to: 'lucas.andrade@injunior.com.br',
    subject: 'Recuperação de Senha',
    html: ''
}

export const sendEmail = async () => {
    try {
        console.log('Enviando email...') 
        await transporter.sendMail(options)
        console.log('Email enviado!')
    } catch (error) {
        console.log('Erro')
        throw error
    }
}