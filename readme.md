# MVP 1 - UFSPet
## Feito por
- Luis Felipi Cruz de Souza [@LuisFSouza](https://github.com/LuisFSouza)
- Ryan de Melo Andrade [@MasteryRyge](https://github.com/MasteryRyge)
- Laura Rieko Marçal Imai [@LauraImai](https://github.com/LauraImai)
- Giovana Maciel dos Santos [@GiovanaMaciel](https://github.com/GiovanaMaciel)

## Setup do Projeto
### Pré-requisitos
Antes de executar o projeto, siga os seguintes passos:

1. **node js**: Certifique que você tem instalado o node. Caso não tenha, [clique aqui](https://nodejs.org/pt). A versão recomendada é a 20.18.1, a que estamos utilizando. 
1. **postgresql**: Certifique que você tem instalado o postgres. Caso não tenha, [clique aqui](https://www.postgresql.org/).

### Execução do Projeto
Para executar o projeto, siga os seguintes passos:

1. **Clone o repositório**: Clone este repositório em sua máquina local utilizando o Git
```
git clone https://github.com/LuisFSouza/ufspet-mvp1.git
```

2. **Banco de dados**: Crie um banco de dados no postgresql.

3. **Backend**: Abra o terminal na pasta do projeto chamada backend
    3.1. **Instale as dependências**: Instale as dependências do backend
    ```
    npm install
    ```
    3.2. **.env**: Crie um arquivo chamado `.env`, que deverá conter a URL da conexão com o banco de dados, como mostrado abaixo. Onde está escrito USER, PASSWORD, HOST, PORT e DATABASE você preenche com as respectivas informações, sendo que DATABASE será o nome do banco de dados que você criou anteriormente. Se tiver dúvidas do que significa cada informação, consulte a guia 'Connection details' neste [link](https://www.prisma.io/docs/orm/overview/databases/postgresql)
    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```
    3.3. **Crie as tabelas no banco de dados**: Rode as migrations para criar as tabelas no banco de dados
    ```
    npx prisma migrate dev
    ```
    3.4. **Inicie o servidor**
    ```
    npm run start:dev
    ```

4. **Frontend**: Abra o terminal na pasta do projeto chamada frontend
    4.1. **Instale as dependências**: Instale as dependências do frontend
    ```
    npm install --legacy-peer-deps
    ```
    4.2. **Inicie o frontend**
    ```
    npm run start
    ```

### Observações
Caso de algum erro, tente atualizar sua versão do node para a recomendada acima.
