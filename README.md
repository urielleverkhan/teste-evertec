# TesteEvertec 🚀

Este projeto foi desenvolvido como parte de um teste técnico, utilizando o [Angular CLI](https://github.com/angular/angular-cli) na versão 19.2.20. A aplicação foca em boas práticas de componentização e testes unitários.

---

## 🛠️ Configuração e Execução

Siga os passos abaixo para preparar o ambiente e rodar a aplicação localmente:

### 1. Instalação

Instale todas as dependências do projeto através do npm:

bash
npm install

### 2. Execução (Aplicação + API Mock)

Para o funcionamento pleno das funcionalidades, o projeto utiliza um servidor de mock. O comando abaixo inicia simultaneamente a aplicação Angular e o http-server (que simula a API com 3 endpoints):

Bash
npm run start:mock

### 3. Testes Unitários

A suíte de testes foi implementada utilizando Jest. Para validar os componentes e serviços, execute:

Bash
npm run test

## 🔐 Guia de Acesso

Para validar o fluxo de autenticação da aplicação, utilize as seguintes credenciais:

Usuário: Naira

Senha: Campo livre (não validado de forma restrita nesta versão, aceitando qualquer valor).

## 💾 Persistência da Sessão

A aplicação gerencia a sessão do usuário através da SessionStorage API:

Comportamento: Uma vez realizado o login, os dados são persistidos na sessão atual do navegador. O acesso não será solicitado novamente ao atualizar a página.

Reset de Fluxo: Para forçar o retorno à tela de login e testar o fluxo do zero, limpe o Application Storage do navegador ou encerre a aba/sessão atual.

## 🏗️ Stack Técnica

Framework: Angular 19 (Standalone Components)

Test Runner: Jest

Linguagem: TypeScript

Mock Server: http-server (JSON Mocking)

Criado por Naira Danile Magalhães

```

```
