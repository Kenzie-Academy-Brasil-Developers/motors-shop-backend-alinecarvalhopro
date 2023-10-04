# Motors Shop 🚗 🚚 🏍️

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
- Insomnia  <br/>
*No projeto existe um arquivo chamado workspace.json que pode ser importado no Insomnia para testes. <br/>
Nas rotas que necessitam de autenticação é necessário inserir o token que vem na resposta do login em Auth > Bearer Token > Token.

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
	
	"name": "Aline Carvalho",
	"address": {
	"cep": "21222290"
	}
}
```

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 200 ok
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

### Deletar usuário (token)
DELETE em /users/:id <br/>

SEM CORPO DE REQUISIÇÃO

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
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

### Criar anúncio (token)
POST em /announcements <br/>

EXEMPLO DE CORPO DE REQUISIÇÃO
```ruby
{
	"brand": "Fiat",
	"model": "500",
	"list_price": 400000,
	"price": 400000,
	"year": "2012",
	"mileage": 100000,
	"description": "Excelente estado",
	"color": "Amarelo",
	"fuel": "Gasolina",
	"images": [
    {
      "url": "www.url.com.br"
    }
  ]
}
```

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 201 created
```ruby
{
	"id": "f3ca9e4b-12c8-40c2-91e8-0aaea35c8eba",
	"brand": "Fiat",
	"model": "500",
	"year": "2012",
	"mileage": 100000,
	"color": "Amarelo",
	"fuel": "Gasolina",
	"list_price": "400000.00",
	"price": "400000.00",
	"description": "Excelente estado",
	"user": {
		"id": "604f4d93-699d-46d3-abd2-9bdbbc29652c",
		"name": "Aline",
		"email": "alineseller@mail.com",
		"cpf": "22222222223",
		"phone_number": "11111112222",
		"birth": "2020-01-01",
		"description": "Descrição",
		"seller": true
	},
	"images": [
		{
			"url": "www.url.com.br"
		}
	]
}
```

### Editar anúncio (token) 
PATCH em /announcements/:id <br/>

EXEMPLO DE CORPO DE REQUISIÇÃO
```ruby
{
	"list_price": 42000
}

```

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 200 ok
```ruby
{
	"id": "f3ca9e4b-12c8-40c2-91e8-0aaea35c8eba",
	"brand": "Fiat",
	"model": "500",
	"year": "2012",
	"mileage": 100000,
	"color": "Amarelo",
	"fuel": "Gasolina",
	"list_price": "42000.00",
	"price": "400000.00",
	"description": "Excelente estado"
}
```

### Listar todos os anúncios
GET em /announcements <br/>

SEM CORPO DE REQUISIÇÃO

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 200 ok

```ruby
[
	{
		"id": "f3ca9e4b-12c8-40c2-91e8-0aaea35c8eba",
		"brand": "Fiat",
		"model": "500",
		"year": "2012",
		"mileage": 100000,
		"color": "Amarelo",
		"fuel": "Gasolina",
		"list_price": "42000.00",
		"price": "400000.00",
		"description": "Excelente estado",
		"comments": [],
		"images": [
			{
				"id": "f08d9598-8440-4d3c-8ac2-ef87b4cb8e8b",
				"url": "www.url.com.br"
			}
		],
		"user": {
			"id": "604f4d93-699d-46d3-abd2-9bdbbc29652c",
			"name": "Aline",
			"email": "alineseller@mail.com",
			"cpf": "22222222223",
			"phone_number": "11111112222",
			"birth": "2020-01-01",
			"description": "Descrição",
			"seller": true
		}
	}
]
```

### Listar todos os anúncios de um vendedor
GET em /announcements/users/:id <br/>

SEM CORPO DE REQUISIÇÃO

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 200 ok

```ruby
[
	{
		"id": "f3ca9e4b-12c8-40c2-91e8-0aaea35c8eba",
		"brand": "Fiat",
		"model": "500",
		"year": "2012",
		"mileage": 100000,
		"color": "Amarelo",
		"fuel": "Gasolina",
		"list_price": "42000.00",
		"price": "400000.00",
		"description": "Excelente estado",
		"comments": [],
		"images": [
			{
				"id": "f08d9598-8440-4d3c-8ac2-ef87b4cb8e8b",
				"url": "www.url.com.br"
			}
		],
		"user": {
			"id": "604f4d93-699d-46d3-abd2-9bdbbc29652c",
			"name": "Aline",
			"email": "alineseller@mail.com",
			"cpf": "22222222223",
			"phone_number": "11111112222",
			"birth": "2020-01-01",
			"description": "Descrição",
			"seller": true
		}
	}
]
```

### Buscar um anúncio
GET em /announcements/:id <br/>

SEM CORPO DE REQUISIÇÃO

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 200 ok

```ruby
{
	"message": {
		"id": "f3ca9e4b-12c8-40c2-91e8-0aaea35c8eba",
		"brand": "Fiat",
		"model": "500",
		"year": "2012",
		"mileage": 100000,
		"color": "Amarelo",
		"fuel": "Gasolina",
		"list_price": "42000.00",
		"price": "400000.00",
		"description": "Excelente estado",
		"user": {
			"id": "604f4d93-699d-46d3-abd2-9bdbbc29652c",
			"name": "Aline",
			"email": "alineseller@mail.com",
			"cpf": "22222222223",
			"phone_number": "11111112222",
			"birth": "2020-01-01",
			"description": "Descrição",
			"seller": true
		},
		"comments": [],
		"images": [
			{
				"id": "f08d9598-8440-4d3c-8ac2-ef87b4cb8e8b",
				"url": "www.url.com.br"
			}
		]
	}
}
```

### Deletar anúncio (token)
DELETE em /announcements/:id <br/>

SEM CORPO DE REQUISIÇÃO

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 204 no content


### Criar comentário
POST em /comments/announcements/:id <br/>

EXEMPLO DE CORPO DE REQUISIÇÃO
```ruby
{
	"comment": "Comentário criado com sucesso."
}
```

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 201 created
```ruby
{
	"message": "Comment registered successfully"
}
```

### Editar comentário (token) 
PATCH em /comments/:id <br/>

EXEMPLO DE CORPO DE REQUISIÇÃO
```ruby
{
	"comment": "Comentário editado com sucesso"
}
```

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 200 ok
```ruby
{
	"message": {
		"id": "8ca83364-6840-47d8-b7da-4a2ee44432e4",
		"comment": "Comentário editado com sucesso",
		"date": "2023-10-04"
	}
}
```


### Buscar os comentários de um anúncio
GET em /comments/announcements/:id <br/>

SEM CORPO DE REQUISIÇÃO

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 200 ok

```ruby
[
	{
		"id": "8ca83364-6840-47d8-b7da-4a2ee44432e4",
		"comment": "Comentário editado com sucesso",
		"date": "2023-10-04",
		"user": {
			"id": "604f4d93-699d-46d3-abd2-9bdbbc29652c",
			"name": "Aline",
			"email": "alineseller@mail.com",
			"cpf": "22222222223",
			"phone_number": "11111112222",
			"birth": "2020-01-01",
			"description": "Descrição",
			"seller": true
		}
	}
]
```

### Deletar comentário (token)
DELETE em /comments/:id <br/>

SEM CORPO DE REQUISIÇÃO

EXEMPLO DE RESPOSTA DE SUCESSO <br/>
status 204 no content

<br/>
<br/>
Licença MIT
Fins educacionais.

