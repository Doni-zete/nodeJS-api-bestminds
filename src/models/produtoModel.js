import dotenv from 'dotenv';
dotenv.config();

const tabelaProdutos = `
  CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255) NOT NULL
  )
`;

async function criaTabelaProdutos(connection) {
    try {
        await connection.query(tabelaProdutos);
        console.log('Tabela "produtos" criada ou já existente.');
    } catch (error) {
        console.error('Erro ao criar a tabela "produtos":', error.message);
    }
}

export { criaTabelaProdutos };
