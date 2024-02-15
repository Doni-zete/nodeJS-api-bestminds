import express from 'express'
const app = express()
import { connectToDatabase } from './src/databases/database.js'
import produtoRoute from './src/routes/produtosRoutes.js'

import cors from 'cors'

app.use(express.json())
const port = 3000

app.use(
 cors({
  origin: ['*'],
  origin: ['http://localhost:3001', 'http://localhost:3002'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
 })
)

app.use('/produto', produtoRoute)

connectToDatabase()
 .then((connection) => {
  console.log('Conexão com o banco de dados estabelecida')

  app.get('/', (req, res) => {
   res.json({
       message: 'Bem-vindo à nossa loja, Nunes Sport!',
   })
  })

  app.listen(port, () => {
   console.log(`Servidor rodando em: http://localhost:${port}`)
  })
 })
 .catch((error) => {
  console.error('Erro na inicialização do servidor:', error)
 })
