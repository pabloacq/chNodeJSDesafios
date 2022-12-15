const { Router } = require('express')
const ProductosRouter = require('./productos')
const ProductosTest = require('./productos-test')
const ChatRouter = require('./chat')
const middleware = require('../../middlewares')
const rutaPrincipal = Router()

const users = [
    {
        username: 'usario1234',
        password: '1234',
        admin: true,
    },
    {
        username: 'usuarioABCD',
        password: 'ABCD',
        admin: false,
    }
]

rutaPrincipal.get('/login', async (req, res) => {
    console.log("login request")
    const { username, password } = req.body;

    const index = users.findIndex((aUser) => aUser.username === username && aUser.password === password);

    if (index < 0) res.status(401).json({ msg: 'usuario o password incorrecto' });
    else {
        req.session.info = {
            loggedIn: true,
            username: username,
            admin: false,
        };

        res.json({ data: `Bienvenido ${username}` })
    }
})




rutaPrincipal.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (!err) res.send('Logout ok!');
        else res.send({ status: 'Logout ERROR', body: err });
    });
})



rutaPrincipal.use(middleware.validateLogIn)


rutaPrincipal.use('/productos', ProductosRouter)
rutaPrincipal.use('/productos-test', ProductosTest)
rutaPrincipal.use('/chat', ChatRouter)



module.exports = rutaPrincipal