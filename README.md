# motors-shop-backend-alinecarvalhopro

_API para gereciamento de uma aplicação de venda de veículos._

### Ela conta com os seguintes recursos:

- Cadastro de Usuário: É possível se cadastrar como vendedor ou comprador.

- Autenticação: Apenas os usuários autenticados têm permissão para editar ou excluir suas próprias contas. 

- Gerenciamento de Anúncios: Os usuários cadastrados como vendedores, além de poder cadastrar um anúncio, podem atualizar informações e  excluir anúncios. Além disso, podem remover comentários dos seus anúncios.

- Comentários: Usuários autenticados podem deixar comentários nos anúncios, bem como editar ou excluir seus próprios comentários.


### Requisitos para instalação e uso:

- Clonar o repositporio
- Criar um banco de dados utilizando PostgreSQL
- Criar um arquivo .env e configurar de acordo com o .env.example
- Rodar os comandos: <br/>
   - `npm install` (Para instalar as dependências do projeto) <br/>
   - `npm run migrate` (Para rodas as migrações) <br/>
   - `npm run dev` (Para rodar o projeto) <br/>

### Tecnologias utilizadas:

- Node.js 
- Express 
- TypeScript
- POO
- PostgreSQL
- TypeORM

### Bibliotecas:

- bcryptjs
- jsonwebtoken
- zod
- dotenv
- express-async-errors
- reflect-metadata

### Plataformas de apoio:

- DBeaver
- Insomnia

Licença MIT
Fins educacionais.

