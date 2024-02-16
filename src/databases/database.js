import { createConnection, createPool } from 'mysql2/promise'
import { criaTabelaProdutos } from '../models/produtoModel.js'

async function connectToDatabase() {
    const dbConfig = {
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        port: process.env.MYSQLPORT,
        password: process.env.MYSQLPASSWORD,
    }

    try {
        const connection = await createConnection(dbConfig)

        await connection.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQLDATABASE}`
        )
        console.log('Banco de dados criado ou já existente.')

        await connection.query(`USE ${process.env.MYSQLDATABASE}`)

        await connection.end()

        const pool = createPool({
            ...dbConfig,
            database: process.env.MYSQLDATABASE,
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
