import { connectToDatabase } from '../databases/database.js'

const selectProdutoController = async (req, res) => {
 try {
  const connection = await connectToDatabase()
  const [selecionaProdutos] = await connection.query('SELECT * FROM produtos')
  connection.release()

  res.json({ produtos: selecionaProdutos })
 } catch (error) {
  console.error('Erro na consulta ao banco de dados:', error.message)
  res.status(500).json({ error: `Erro interno do servidor ${error}` })
 }
}

const deleteProdutoController = async (req, res) => {
 try {
  const connection = await connectToDatabase()
  const produtoId = req.params.id

  const [produtoExist] = await connection.query(
   'SELECT 1 FROM produtos WHERE id = ?',
   [produtoId]
  )

  if (!produtoExist.length) {
   connection.release()
   return res
    .status(404)
    .json({ message: `Produto com ID ${produtoId} não encontrado` })
  }

  await connection.query('DELETE FROM produtos WHERE id = ?', [produtoId])

  connection.release()
  return res.json({
   message: `Produto com ID ${produtoId} excluído com sucesso`,
  })
 } catch (error) {
  console.error('Erro na consulta ao banco de dados:', error.message)
  res.status(500).json({ error: `Erro interno do servidor ${error}` })
 }
}

const updateProdutoController = async (req, res) => {
 try {
  const { nome, codigo, descricao, preco, imagem } = req.body
  const produtoId = req.params.id

   if (!nome || !codigo || !descricao || !preco || !imagem || !produtoId) {
   return res
    .status(400)
    .json({ error: 'ID, nome, codigo e descricao são obrigatórios' })
  }

  const connection = await connectToDatabase()

  const [produtoExist] = await connection.query(
   'SELECT 1 FROM produtos WHERE id = ?',
   [produtoId]
  )

  if (!produtoExist.length) {
   return res
    .status(404)
    .json({ message: `Produto com ID ${produtoId} não encontrado` })
  }
   
  const updateQuery =
   'UPDATE produtos SET nome = ?, codigo = ?,  descricao = ?, preco = ?, imagem = ?WHERE id = ?'
   const values = [nome, codigo, descricao, preco, imagem, produtoId]

  await connection.query(updateQuery, values)
  connection.release()

  res
   .status(200)
   .json({ mensagem: `Produto ${produtoId} atualizado com sucesso` })
 } catch (error) {
  console.error('Erro na atualização do produto:', error.message)
  res.status(500).json({ error: `Erro interno do servidor ${error}` })
 }
}

const createProdutoController = async (req, res) => {
 try {
  const { nome, codigo, descricao, preco, imagem } = req.body

   if (!nome || !codigo || !descricao || !preco || !imagem ) {
   return res
    .status(400)
    .json({ error: 'Nome, código, descrição, preco e imagem são obrigatórios' })
  }

  const connection = await connectToDatabase()
   const values = [nome, codigo, descricao, preco, imagem]

  const [selecionaProdutos] = await connection.query(
   'INSERT INTO produtos(nome, codigo, descricao, preco, imagem) VALUES(?,?,?,?,?)',
   values
  )


  res
   .status(201)
   .json({
    mensagem: 'Produto criado com sucesso',
    novoProduto: {
     id: selecionaProdutos.insertId,
     nome,
     codigo,
     descricao,
     preco,
     imagem,
    },
   })
  console.log(`novoProduto: ${values}`)
 } catch (error) {
  console.error('Erro na consulta ao banco de dados:', error.message)
  res.status(500).json({ error: `Erro interno do servidor ${error}` })
 }
}

const produtoController = {
 selectProdutoController,
 deleteProdutoController,
 updateProdutoController,
 createProdutoController,
}

export default produtoController
