Cypress Heroes - Automação de Testes E2E 
Este repositório contém uma suíte de testes ponta a ponta (End-to-End) desenvolvida com Cypress. O projeto foi estruturado para garantir a resiliência do sistema Cypress Heroes, cobrindo desde a limpeza de dados até o cadastro completo de personagens com mídia.

 O que este teste faz?

O script executa um fluxo completo e independente:

Autenticação: Realiza o login administrativo automaticamente.

Cleanup (Limpeza): Identifica heróis existentes e os exclui para evitar duplicidade, garantindo que o ambiente comece "zerado".

Cadastro em Massa: Realiza o cadastro de uma lista completa de heróis, validando o upload de fotos via Fixtures, seleção de poderes e persistência no banco.

 Requisitos de Ambiente (Importante)

Para os testes funcionarem, o ecossistema do sistema deve estar ativo. Atenção aos diretórios:

Frontend (Client): Deve estar rodando na porta 3000.

Backend (Server): Deve estar rodando na porta 3001 (geralmente em um repositório ou pasta separada).

Banco de Dados: Certifique-se de que o serviço do banco de dados (ex: Prisma/SQLite) está ativo.

🏁 Passo a Passo para Rodar
1. Clonar o Repositório
Abra o terminal na pasta onde deseja salvar o projeto:

Bash

git clone https://github.com/danieldinizqa/cypress-heroes.git

2. Abrir a Pasta Correta

⚠️ MUITO IMPORTANTE: Para evitar erros de caminho (path), abra o seu VS Code ou Terminal diretamente na pasta raiz do projeto de automação:

Bash

cd cypress-heroes

3. Instalar Dependências e Iniciar
Instale as bibliotecas necessárias:

Bash

npm install

Para rodar o projeto em modo de desenvolvimento (caso necessário):

Bash

npm run dev

4. Executar os Testes
Com o Client e o Server já rodando em seus respectivos terminais, execute o Cypress:

Interface Visual (Recomendado):

Bash

npx cypress open

Modo Headless (Execução rápida via terminal):

Bash

npx cypress run


 Estrutura do Projeto
cypress/e2e/: Scripts de teste principais (.cy.js).

cypress/fixtures/: Imagens e arquivos estáticos para teste de upload.

cypress.config.ts: Configurações de ambiente e URLs base.

⭐ Desenvolvido por Daniel Diniz para o portfólio de QA Automation.