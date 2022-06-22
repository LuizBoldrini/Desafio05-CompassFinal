
# <p align="center">Desafio Sprint 05 | Compass</p>

## Libs e suas versões 📚
```
bcryptjs: ^2.4.3            body-parser: ^1.20.0
express: ^4.18.1            joi: ^17.6.0
jsonwebtoken: ^8.5.1        moment: ^2.29.3
mongoose: ^6.3.5            mongoose-paginate-v2: ^1.6.3
@joi/date: ^2.1.0           axios: ^0.27.2
dotenv: ^16.0.1             swagger-ui-express: ^4.4.0

devDependencies:
eslint: ^8.16.0             nodemon: ^2.0.16
jest: ^28.1.0               eslint-config-airbnb-base: ^15.0.0
prettier: ^2.7.1            eslint-config-node: ^4.1.0
supertest: ^6.2.3           eslint-config-plugin: ^1.0.11
eslint-plugin-node: ^11.1.0 eslint-plugin-prettier: ^4.0.0
```

---
## Swagger 📃
`http://localhost:3000/api/v1/api-docs/`

---
## Indice 🗂️
[Descrição](#Descrição)

[Funcionalidades](#Funcionalidades)

[Instalação](#Instalação)

[API-Car](#Api-Car)

[API-Person](#Api-Person)

[API-Authenticate](#API-Authenticate)

[API-Rental](#Api-Rental)

[API-Fleet](#Api-Fleet)

[API-Reserve](#Api-Reserve)


---

## Descrição 🆘
Esta é uma API RestFull para uma locadora de carros, chamada Renpass.uol. Usada para cadrastrar os carros da empresa e também para cadrasto de clientes.

## Funcionalidades ⚙️🔧
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
---
## Instalação 📥

No terminal, clone o projeto:

`git clone https://github.com/LuizBoldrini/Desafio05-CompassFinal.git`

Instale as dependências:

`npm install` 

---
## Iniciar servidor:

Caso tenha instalado o nodemon: `npm run dev`.

Caso não tenha instalado: `npm start`

---
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
            "year": "2001",
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
    "year": "2021",
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


### Atualizar um acessório de um carro
PATCH: `/api/v1/car/:id/acessorios/:idAcess`
```bash
{
    "description": "Ar-condicionado"
}
```
---
## API-Person

### Criar um endpoint para cadastrar uma pessoa
POST: `/api/v1/person`

```bash
{
    "name": "Joãozinho Silva",
    "cpf": "04126271244",
    "birthDay": "10/10/2001",
    "email": "joazinho@emai.com",
    "password": "123456",
    "canDrive": "yes"
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
        "_id": "62b25f97e2f0ef696a7ba375",
        "name": "Joãozinho Silva",
        "cpf": "041.262.712-44",
        "birthDay": "10/01/2002",
        "email": "joazinho@emai.com",
        "canDrive": "yes"
    }
]
```

### Atualizar alguma pessoa cadastrada
PUT: `/api/v1/person/:id`

### Buscar pessoa X cadastrado 
GET `/api/v1/person/:id`
```bash
{
    "_id": "62b25f97e2f0ef696a7ba375",
    "name": "Joãozinho Silva",
    "cpf": "041.262.712-44",
    "birthDay": "10/01/2002",
    "email": "joazinho@emai.com",
    "canDrive": "yes"
}
```

### Deletar uma pessoa
DELETE: `/api/v1/car/:id`

Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.

---
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
    "canDrive": "yes",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjBjYjdiNTg2NzcxYTdiNjk0OGY5MyIsImlhdCI6MTY1NTg0ODYxNCwiZXhwIjoxNjU1OTM1MDE0fQ.bpFid4uCgfLO5iTNcuh_tV1kX-4owTSLLrhjxL8ChuI"
}
```
Atenção:
- Receber um token de autenticação através de um JWT o seu email e se é canDrive é
yes ou no
- O token é retornado no header da requisição e a requisição retorna 204.
- OBSERVAÇÕES: Este campo ilustrativo "recebe" foi colocado com status 201 para ilustrar oque vai receber, depois do teste, retornado para 204.

---
## API-Rental

### Criar um endpoint para cadastrar uma locadora
POST: `/api/v1/rental`

```bash
{
    "name": "LocaleFácil LtdA",
    "cnpj": "16.670.085/0001-12",
    "activities": "Aluguel de Carros E Gestão de Frotas",
    "address": [
    {
        "zipCode": "96200-200",
        "number":"1234",
        "isFilial": false
    },
    {
        "zipCode": "76937-000",
        "number":"1234",
        "isFilial": true
    }]
}
```
Atenção:
- Todos os campos são required, EXCETO o campo complemento.
- Não é possível haver CNPJs duplicados.
- Deve haver APENAS um isFilial: false ou seja apenas uma Matriz, as demais caso
houver são filiais.
- Atentem-se que no payload de cadastro da locadora, é enviado apenas o CEP. Para
buscar o endereço completo, iremos realizar uma requisição a uma API externa
chamada VIA CEP.


## Listar todas locadoras cadastradas
GET: `/api/v1/rental`

```bash
{
    "rental": [
        {
            "_id": "62b0a8b3d716bd3dd8fa0095",
            "name": "LocaleFácil LtdA",
            "cnpj": "16.670.085/0001-11",
            "activities": "Aluguel de Carros E Gestão de Frotas",
            "address": [
                {
                    "zipCode": "96200-200",
                    "street": "Rua General Canabarro",
                    "district": "Centro",
                    "number": 1234,
                    "city": "Rio Grande",
                    "state": "RS",
                    "isFilial": false
                },
                {
                    "zipCode": "76937-000",
                    "street": "",
                    "district": "",
                    "number": 1234,
                    "city": "Costa Marques",
                    "state": "RO",
                    "isFilial": true
                }
            ]
        }
    ]
    "total": 2,
    "offset": 1,
    "limit": 100,
    "offsets": 1
}
```

### Atualizar alguma locadora cadastrada
PUT: `/api/v1/rental/:id`

### Buscar locadora X cadastrado 
GET `/api/v1/rental/:id`
```bash
{
    "_id": "62b0aaf97e69187b5e125c02",
    "name": "LocaleFácil LtdA",
    "cnpj": "16.670.085/0001-12",
    "activities": "Aluguel de Carros E Gestão de Frotas",
    "address": [
        {
            "zipCode": "96200-200",
            "street": "Rua General Canabarro",
            "district": "Centro",
            "number": 1234,
            "city": "Rio Grande",
            "state": "RS",
            "isFilial": false
        },
        {
            "zipCode": "76937-000",
            "street": "",
            "district": "",
            "number": 1234,
            "city": "Costa Marques",
            "state": "RO",
            "isFilial": true
        }
    ]
}
```
Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.
  
### Deletar uma locadora
DELETE: `/api/v1/rental/:id`

Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.
---

## API-Fleet

### Criar um endpoint para cadastrar uma frota
POST: `/api/v1/rental/:id_rental/fleet`

```bash
{
    "id_car": "62b0e95531bf6ad0fe8e113e",
    "status": "available",
    "daily_value": 100,
    "plate": "ABC1234"
} 
```
Atenção:
- Todos os campos são required.
- status pode ser available, unavailable, rented.
- Não pode haver um mais de um carro com a mesma placa.
- id_car = Id correspondente ao carro.
- id_rental = Id da locadora dona do carro. (Será fornecido na url da requisição).
-  id_rental poderá ser de uma locadora filial.


## Listar todas frotas cadastradas
GET: `/api/v1/rental/:id_rental/fleet`

```bash
{
    "fleet": [
        {
            "_id": "62b215c589814ad8252b27a8",
            "id_car": "62b0e95531bf6ad0fe8e113e",
            "id_rental": "62b0aaf97e69187b5e125c02",
            "status": "rented",
            "daily_value": 100,
            "plate": "ABC1234"
        }
    ],
    "total": 1,
    "offset": 1,
    "limit": 100,
    "offsets": 1
}
```

### Atualizar alguma frota cadastrada
PUT: `/api/v1/rental/:id_rental/fleet/:id`
Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.

### Buscar locadora X cadastrado 
GET `/api/v1/rental/:id_rental/fleet/:id`
```bash
{
    "_id": "62b215c589814ad8252b27a8",
    "id_car": "62b0e95531bf6ad0fe8e113e",
    "id_rental": "62b0aaf97e69187b5e125c02",
    "status": "rented",
    "daily_value": 100,
    "plate": "ABC1234"
}
```
Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.
  
### Deletar uma locadora
DELETE: `/api/v1/rental/:id_rental/fleet/:id`

Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.
---


## API-Reserve 

### Criar um endpoint para cadastrar uma reserva
POST: `/api/v1/rental/:id_rental/reserve`

```bash
{
    "id_user": "62b0d2196320342b42707d83",
    "data_start": "20/11/2021",
    "data_end": "30/11/2021",
    "id_car": "62accd642ba00b36243fb050"
}
```
Atenção:
- Todos os campos são required.
- Calcular o final_value baseado no valor da diária.
- O usuário que for locar o carro precisa obrigatoriamente possuir habilitação.
- id_car = Id correspondente ao carro.
- id_rental = Id da locadora dona do carro. (Será fornecido na url da requisição).
-  id_rental poderá ser de uma locadora filial.
-  OBSERVAÇÃO: id_car é preenchido com id_fleet em que o carro esteja.


## Listar todas reservas cadastradas
GET: `/api/v1/rental/:id_rental/reserve`

```bash
{
    "reserve": [
        {
            "_id": "62b2347dab93fde5a9d464c0",
            "id_user": "62b0d2196320342b42707d83",
            "data_start": "20/11/2021",
            "data_end": "30/11/2021",
            "id_car": "62accd642ba00b36243fb050",
            "id_rental": "62b0a8b3d716bd3dd8fa0095",
            "final_value": 1500
        }
    ],
    "total": 7,
    "offset": 1,
    "limit": 100,
    "offsets": 1
}
```

### Atualizar alguma reserva cadastrada
PUT: `/api/v1/rental/:id_rental/reserve/:id`
Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.

### Buscar reserva X cadastrada
GET `/api/v1/rental/:id_rental/reserve/:id`
```bash
{
    "_id": "62b20a5cd15cd7fe52fa5df1",
    "id_user": "62b0d2196320342b42707d83",
    "data_start": "20/11/2021",
    "data_end": "30/11/2021",
    "id_car": "62accd642ba00b36243fb050",
    "id_rental": "62b0a8b3d716bd3dd8fa0095",
    "final_value": 1500
}
```
Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.
  
### Deletar uma locadora
DELETE: `/api/v1/rental/:id_rental/reserve/:id`

Atenção:
- Caso o ID seja diferente do padrão deve retornar 400, informando o erro;
- Caso o ID não seja encontrado retornar 404.
---
