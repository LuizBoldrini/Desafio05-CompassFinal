
# <p align="center">Desafio Sprint 05 | Compass</p>

## Libs e suas versões
```
bcryptjs: ^2.4.3        body-parser: ^1.20.0
express: ^4.18.1        joi: ^17.6.0
jsonwebtoken: ^8.5.1    moment: ^2.29.3
mongoose: ^6.3.5        mongoose-paginate-v2: ^1.6.3

devDependencies:
eslint: ^8.16.0         nodemon: ^2.0.16
```

## Indice
[Descrição](#Descrição)

[Funcionalidades](#Funcionalidades)

[Instalação](#Instalação)

[API-Car](#Api-Car)

[API-Person](#Api-Person)

[API-Authenticate](#API-Authenticate)

## Descrição
Como solicitado, esta é uma API RestFull para uma locadora de carros, chamada Renpass.uol. Usada para cadrastrar os carros da empresa e também para cadrasto de clientes.

## Funcionalidades
**Funcionalidade 1:** Realizar cadastro dos carros:
```
-Deve ter pelo menos um acessório e não se pode repetí-los.
-O ano do carro deve ser entre 1950 até 2022.
-O número de passageiros não pode ser menor que um.
```
**Funcionalidade 2:** Listar todos os carros cadrastrados: 
```
-Pode ser feito uma busca por todos os carros.
-Tipos específicos com pesquisas personalizadas(ex: cor, modelo type).
-Busca pelo id de cada carro.
```
**Funcionalidade 3:** Realizar cadastro dos Clientes que irão usar os carros: 
```
-O usuário deve ter no mínimo 18 anos.
-Ter cpf válido.
-Senha de no mínimo 6 dígitos.
-Ter email válido.
-Especificar se pode ou não dirigir.
```
**Funcionalidade 4:** Fazer autenticação do cliente:
```
-Recebe um token de autenticação caso o email e senha estejam corretos.
```

## Instalação

No terminal, clone o projeto:

`git clone https://github.com/LuizBoldrini/Desafio05-CompassFinal.git`

Instale as dependências:

`npm install` 

## Iniciar servidor:

Caso tenha instalado o nodemon: `npm start`.

Caso não tenha instalado: `node .\src\index.js`

## API-Car


### Cadastrar Carro
POST: ``/api/v1/car``

```bash
{
    "model": "S10 2.8",
    "type": "sedan",
    "brand": "GM",
    "color": "branco",
    "year": "2021",
    "accessories": [
    {
        "description": "Ar-condicionado"
    },
    {
        "description": "Dir. Hidráulica"
    },
    {
        "description": "Cabine Dupla"
    },
    ],
    "passengersQtd": 5
    }
```
Atenção:
- Todos os campos são required;
- É necessário ter pelo menos UM acessório;
- O ano do carro não pode ser menor que 1950 e maior que 2022;
- Não pode haver acessórios repetidos;
- A quantidade de passageiros não pode ser menor que 1;
- OBSERVAÇÃO: Campo `year` deve receber APENAS o ano.

### Listar todos os carros cadastrados
GET: `/api/v1/car`

GET: `/api/vi/car?query=value`

```bash
{
    "CarSchema": [
        {
            "_id": "629d1382baca17a6384e0da0",
            "model": "teste",
            "type": "sedan",
            "brand": "GM",
            "color": "preto",
            "year": "2000-01-01T00:00:00.000Z",
            "accessories": [
                {
                    "description": "Diesel",
                    "_id": "629d1382baca17a6384e0da1"
                },
                {
                    "description": "Teto solar",
                    "_id": "629d1382baca17a6384e0da2"
                }
            ],
            "passengersQtd": 5
        }
    ],
    "total": 2,
    "offset": 1,
    "limit": 10,
    "offsets": 1
}
```
### Atualizar algum carro cadastrado
PUT: `/api/v1/car/:id`

Atenção:
- Qualquer campo pode ser alterado;
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Assim como as regras do cadastrar valem para o update.

### Buscar carro X cadastrado 
GET `/api/v1/car/:id`
```bash
{
    "_id": "629bc0693b2c003c117b79f7",
    "model": "S10 2.8",
    "type": "sedan",
    "brand": "GM",
    "color": "branco",
    "year": "2022-01-01T00:00:00.000Z",
    "accessories": [
        {
            "description": "Diesel",
            "_id": "629bc0693b2c003c117b79f8"
        },
        {
            "description": "Diesel",
            "_id": "629bc0693b2c003c117b79f9"
        }
    ],
    "passengersQtd": 1,
    "__v": 0
}
```
Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404

### Deletar um carro
DELETE: `/api/v1/car/:id`

Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.

## API-Person

### Criar um endpoint para cadastrar uma pessoa
POST: `/api/v1/person`

```bash
{
    "name": "Joãozinho Silva",
    "cpf": "041.262.712-44",
    "birthDay": "2002-10-10T03:00:00.000Z",
    "email": "joazinho@emai.com",
    "password": "$2a$10$PtfVp7/cTfsdD7mOkULFke2c2saUBVYhJ9hICegHVrjUspfHC8btu",
    "canDrive": "yes",
    "_id": "629d3d55b886502fccfd8fb4"
}
```
Atenção:
- Todos os campos são required
- O usuário tem que ter no mínimo 18 anos a partir da data de cadastro.
- Precisa ter um CPF valido
- Precisa ter uma senha no mínimo 6 dígitos
- A senha não deve ser armazenada como texto
- Precisa ter um email válido
- canDrive pode ser yes ou no
- Assim como as rotas de carro o usuário pode cadastrar, atualizar, remover, buscar
por id e listar todos os usuários, logo realizar um CRUD completo, na listagem o
atributo people conterá os resultados.
- Validações devem retornar 400


## Listar todas pessoas cadastradas
GET: `/api/v1/person`

```bash
[
    {
        "_id": "629d3d55b886502fccfd8fb4",
        "name": "Joãozinho Silva",
        "cpf": "041.262.712-44",
        "birthDay": "2002-10-10T03:00:00.000Z",
        "email": "joazinho@emai.com",
        "canDrive": "yes"
    }
]
```

### Atualizar alguma pessoa cadastrada
PUT: `/api/v1/person/:id`

### Buscar carro X cadastrado 
GET `/api/v1/person/:id`
```bash
{
    "_id": "629d3d55b886502fccfd8fb4",
    "name": "Joãozinho Moura",
    "cpf": "041.262.712-44",
    "birthDay": "2002-10-10T03:00:00.000Z",
    "email": "joazinho@emai.com",
    "canDrive": "yes"
}
```

### Deletar um carro
DELETE: `/api/v1/car/:id`

Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.


## API-Authenticate

### Autenticação com o usuário 
POST: `/api/v1/authenticate`

Envia:
```bash
{
    "email": "joazinho@email.com",
    "password": "123456"
}
```
Recebe: 
```bash
{
    "user": {
        "_id": "629d4c314c60b4dc3509b07f",
        "name": "Joãozinho Moura",
        "cpf": "041.262.712-44",
        "birthDay": "2002-10-10T03:00:00.000Z",
        "email": "joazinho@emai.com",
        "canDrive": "yes"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWQ0YzMxNGM2MGI0ZGMzNTA5YjA3ZiIsImlhdCI6MTY1NDQ3NTg3NSwiZXhwIjoxNjU0NTYyMjc1fQ.ETr0vBSQQ4thkU9rfDFzWuynlb8TqbGKE7CoKp_D8Jg"
}
```
Atenção:
- Receber um token de autenticação através de um JWT o seu email e se é canDrive é
yes ou no
- O token é retornado no header da requisição e a requisição retorna 204.
- OBSERVAÇÕES: Este campo ilustrativo "recebe" foi colocado com status 201 para ilustrar oque vai receber, depois do teste, retornado para 204.
- 