// Configurações do Express
const express = require('express')
const app = express()
const port = 3000

// Configurações do prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Configurações de token
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'sjfdlksaJSD#$S%D$s3d4#35ds5adaçlkd~4sfds';

// Middlewares
app.use(express.static('public'))
app.use(express.json())

// Valida Nome
function validarNome(nome) {
    if (!nome) {
        return false;
    }

    return true;
}

// Valida Email
function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Valida o password
function validarPassword(password) {
    if (!password) {
        return false;
    }

    return true;
}

app.post('/register-client', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`\nName:${name}\nEmail:${email}\nPassword: ${password}\n`)

    if (!validarNome(name)) {
        return res.status(422).json({ msg: 'Nome de usuário inválido!' });
    } else if (!validarEmail(email)) {
        return res.status(422).json({ msg: 'E-mail inválido!' });
    } else if (!validarPassword(password)) {
        return res.status(422).json({ msg: 'O campo de senha não pode estar vazio!' });
    }

    const candidatoEmUso = await prisma.usuario.count({
        where: {
            email: email
        }
    }).then((res) => {
        if (res > 0) {
            return true;
        } else {
            return false;
        }
    })

    if (candidatoEmUso) {
        return res.status(409).json({ status: 200, msg: 'O email enviado já está sendo usado!' });
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

    console.log(usuario);

    console.log('Usuário cadastrado com sucesso!\n\n');

    return res.status(200).json({ msg: 'Cadastro realizado com sucesso!' });
})

app.post('/client-auth', async (req, res) => {
    const { email, password } = req.body;

    if (!validarEmail(email)) {
        return res.status(422).json({ msg: 'E-mail inválido!' });
    } else if (!validarPassword(password)) {
        return res.status(422).json({ msg: 'O campo de senha não pode estar vazio!' });
    }

    const usuario = await prisma.usuario.findUnique({
        where: {
            email: email
        }
    });

    if (!usuario) {
        return res.status(404).json({ msg: 'Usuário não encontrado! Verifique o seu e-mail!' });
    }

    console.log('Usuário encontrado: ', usuario);

    const senhaValida = await bcrypt.compare(password, usuario.password);

    if (!senhaValida) {
        return res.status(403).json({ msg: 'A senha está incorreta!' });
    }

    try {

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            secret
        );
        console.log(`Este é o token do usuário: ${token}`);
        return res.status(200).json({ msg: 'Login realizado com sucesso!', token } );

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Aconteceu algum erro no servidor, tente novamente mais tarde!' });
    }

})

app.get('/cadastro', (req, res) => {
    res.sendFile(`${__dirname}/public/cadastro.html`);
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})