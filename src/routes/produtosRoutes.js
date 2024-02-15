import express from 'express'
import produtoController from '../controllers/produtoController.js'

const router = express.Router()

router.delete('/delete/:id', produtoController.deleteProdutoController)
router.get('/findAll', produtoController.selectProdutoController)
router.put('/update/:id', produtoController.updateProdutoController)
router.post('/create', produtoController.createProdutoController)

export default router
