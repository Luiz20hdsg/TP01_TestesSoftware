# Trabalho Prático 1 de Teste de Software

Este repositório contém o código fonte e os testes de unidade para o Trabalho Prático 1 da disciplina de Teste de Software da UFMG.

## Integrantes:

* Luiz Henrique da Silva Goncalves
* Felipe Zan Coelho
* Davi Esondem Menezes Brito

## Descrição do Trabalho Prático

O objetivo deste trabalho prático é desenvolver e testar um pequeno sistema de software (com ao menos 500 linhas de código) armazenado em um repositório GitHub. Deve-se implementar 50 testes de unidade, seguindo boas práticas como testes através de API públicas, teste de comportamento, bons nomes, testes focados e testes não-complexos. Por fim, os testes devem ser executados automaticamente a cada commit no GitHub, utilizando a ferramenta de CI/CD GitHub Actions.

## Descrição do Sistema:

Este repositório implementa uma API REST no contexto de uma empresa de seguro de saúde. Um cliente da empresa pode ser cadastrado, alterado, buscado e removido, além de possuir todos os seus problemas de saúde e seu score de risco listados.

### Tecnologias utilizadas:

* Servidor de API: NestJS e Typescript
* Banco de dados: MongoDB e Prisma (ORM)
* Testes: Jest
* Documentação: Swagger

### Funcionalidades:

* Criar um cliente
* Gerenciar clientes
* Editar um cliente
* Obter um cliente específico
* Listar clientes

### Campos do cliente:

* name
* date of birth
* gender
* health issues
* creation date
* update date

### Campos dos problemas de saúde (Health Issues):

* name
* severity level (de 1 a 2)
* e.g., diabetes, nivel 2

### Cálculo do risco de saúde:

Ao recuperar os 10 clientes com maior risco de saúde, é utilizado o seguinte cálculo:

* sd = soma dos níveis de severidade dos problemas
* score = (1 / (1 + e^(-(-2.8 + sd)))) \* 100

### Testes:

Esta API possui 50 testes distribuídos em 7 suítes de teste localizadas em src/core/. Os testes podem ser executados com o seguinte comando:

npm run test

### CI/CD:

Os testes de unidade são executados automaticamente a cada commit no GitHub, utilizando a ferramenta de CI/CD GitHub Actions. O arquivo de configuração do GitHub Actions está localizado no diretório raiz do projeto, com o nome de github-actions.yml.

### Como rodar os testes da aplicação através do terminal:

Para rodar a aplicação, você precisa ter instalado o Node.js e git em sua máquina. Em seguida, siga os passos abaixo:

1. Abra o terminal
2. git clone https://github.com/Luiz20hdsg/TP01_TestesSoftware
3. cd TP01_TestesSoftware
4. npm install
5. npm run test

