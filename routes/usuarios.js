const {Router}= require('express')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')
const router = Router()

/*this.app.get('/', (req, res) => { 
    res.send('Hello World')
})*/

router.get('/',usuariosGet)

router.put('/:id', usuariosPut)
router.post('/', usuariosPost)
router.delete('/:id',usuariosDelete)
router.patch('/:id', usuariosPatch)

module.exports = router