import { createConnection, createPool } from 'mysql2/promise'
import { criaTabelaProdutos } from '../models/produtoModel.js'

async function connectToDatabase() {
 const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
 }

 try {
  const connection = await createConnection(dbConfig)

  await connection.query(
   `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`
  )
  console.log('Banco de dados criado ou já existente.')

  await connection.query(`USE ${process.env.DB_DATABASE}`)

  await connection.end()

  const pool = createPool({
   ...dbConfig,
   database: process.env.DB_DATABASE,
  })

  const conexaoPrincipal = await pool.getConnection()

  console.log('MySQL conectado')

  await criaTabelaProdutos(conexaoPrincipal)

  return conexaoPrincipal
 } catch (error) {
  console.error('Erro na conexão com o banco de dados MySQL:', error.message)
  throw error
 }
}

export { connectToDatabase }
