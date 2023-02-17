const express = require('express')
const app = express()
const port = 3000

// configurações do prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// configurações de token
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.static('public'))
app.use(express.json())

app.post('/register-client', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`\nName:${name}\nEmail:${email}\nSenha: ${password}\n`)

    const candidatoEmUso = await prisma.usuario.count({
        where:{
            email: email
        }
    }).then((res)=>{
        if(res > 0){
            return true;
        } else {
            return false;
        }
    })

    if(candidatoEmUso){
        res.status(409).json({status:200, msg:'O email enviado já está sendo usado!'});
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const usuario = await prisma.usuario.create({
        data: {
            nome: name,
            email: email,
            password: passwordHash
        }
    })

    console.log(usuario)

    return res.status(200).json({ msg: 'Cadastro realizado com sucesso!' })
})

app.get('/cadastro', (req, res) => {
    return res.sendFile('/cadastro.html')
})

app.get('/', (req, res) => {
    res.sendFile('/index.html')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})