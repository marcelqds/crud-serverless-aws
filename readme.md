## CRUD serverless - AWS
### Criação de um cadastro de produto contendo os campos
```
    id: string
    description: string
    createdAt: string
```

## Tecnologias Utilizadas
[x] NodeJS 18.x
[x] Serverless
[x] Aws-sdk
[x] AWS Lambda
[X] AWS DynamoDB

## Recursos disponíveis
Lista de produtos
`GET /products`
Buscar um único produto
`GET /product/{id}`
Criar um novo produto
`POST /product`
```
    {
        description: "Nome exemplo"
    }
```
Editar um produto
`POST /product/{id}`
```
    {
        description: "Exemplo atual"
    }
```