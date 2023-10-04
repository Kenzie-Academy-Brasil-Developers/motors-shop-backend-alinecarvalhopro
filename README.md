# Motors Shop

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

### Plataformas de apoio que utilizei no desenvolvimento:

- DBeaver
- Insomnia

## Endpoints, com exemplos de requisição e reposta

### Criar usuário
POST em /users <br/>
_A chave "seller" é opcional, porém deve ser enviada no cadastro de um usuário vendedor e deve ter valor "true"._ <br/>
_As chaves "email" e "cpf" são únicas._

EXEMPLO DE CORPO DE REQUISIÇÃO
```ruby
{
	"name": "Aline",
	"email": "alineseller@mail.com",
	"cpf": "11111111111",
	"phone_number": "11111111111",
	"birth": "1990/01/01",
	"description": "Vendedora",
	"password": "12345678",
	"seller": true,
   "address": {
	"cep": "11111111",
	"state": "SP",
	"city": "São Paulo",
	"street": "Rua Nome da Rua",
	"number": "12",
	"complement": "Sem complemento"
	}
}
```

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 201 created
```ruby
{
	"name": "Aline",
	"email": "alineseller@mail.com",
	"cpf": "11111111111",
	"phone_number": "11111111111",
	"birth": "1990/01/01",
	"description": "Vendedora",
	"password": "12345678",
	"seller": true,
   "address": {
	"cep": "11111111",
	"state": "SP",
	"city": "São Paulo",
	"street": "Rua Nome da Rua",
	"number": "12",
	"complement": "Sem complemento"
	}
}
```

### Editar usuário (token) 
PATCH em /users/:id <br/>
_As chaves "email" e "cpf" são únicas._

EXEMPLO DE CORPO DE REQUISIÇÃO
```ruby
{
	"id": "8d2863b3-0a57-49ee-a498-52277e0a2e59",
	"name": "Aline Carvalho",
	"email": "alineseller@mail.com",
	"cpf": "11111111111",
	"phone_number": "11111111111",
	"birth": "1990-01-01",
	"description": "Vendedora",
	"seller": true,
	"address": {
		"cep": "21222290",
		"state": "SP",
		"city": "São Paulo",
		"street": "Rua Nome da Rua",
		"number": "12",
		"complement": "Sem complemento"
	}
}
```

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 200 ok
```ruby
{
	
	"name": "Aline Carvalho",
	"address": {
	"cep": "21222290"
	}
}

```

### Deletar usuário (token)
DELETE em /users/:id <br/>

SEM CORPO DE REQUISIÇÃO

EXEMPLO DE RESPOSTA DE SUCESSO 
status 204 no content


###  Login
POST em /login <br/>

EXEMPLO DE CORPO DE REQUISIÇÃO
```ruby
{
	"email": "alineseller@mail.com",
	"password": "12345678"
}
```

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 200 ok
```ruby
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFsaW5lIiwiaWF0IjoxNjk2NDQ2OTU5LCJleHAiOjE2OTY0NTA1NTksInN1YiI6IjYwNGY0ZDkzLTY5OWQtNDZkMy1hYmQyLTliZGJiYzI5NjUyYyJ9.xIjetSI3G4kyz-Shf9uvQA44uYuXJd5PIv_UJgZ0DfY"
}
```


Licença MIT
Fins educacionais.

