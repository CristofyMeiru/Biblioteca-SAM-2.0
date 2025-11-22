# **📚 Biblioteca - SAM** (Sistema de Acervo e Monitoramento)

O **Biblioteca - SAM** é uma **plataforma monolítica** e robusta para o **gerenciamento de acervo**, **usuários** e processos de **empréstimo/devolução** de uma biblioteca acadêmica ou institucional.

Utilizando o poder do **Next.js 15**, garantimos uma aplicação de alto desempenho, acessível e com uma experiência de usuário fluida.

## **🚀 Tecnologias**

Este projeto foi construído sobre uma arquitetura moderna e coesa:

* **Next.js 15** (App Router): Core do sistema, provendo a estrutura monolítica (**Frontend + Backend**), **Server-Side Rendering (SSR)** e **React Server Components (RSC)** para máxima performance.
* **TypeScript**: Linguagem principal para desenvolvimento, garantindo **segurança** e escalabilidade através da **tipagem estrita**.
* **Shadcn/ui**: Biblioteca de **componentes de UI** minimalistas e acessíveis, customizáveis e integrados perfeitamente com o Tailwind CSS.
* **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva.
* **ORM Drizzle**: para comunicação eficiente e tipada com o **banco de dados**.

***

## **🏛️ Arquitetura (Monolito SSR)**

Adotamos a estratégia **Monolítica Next.js** para simplificar o ciclo de desenvolvimento e deployment, mantendo a responsabilidade do Frontend e Backend no mesmo repositório e aplicação.

O uso intensivo de **Server Components** permite que a **lógica de acesso a dados** e de **negócio** mais crítica seja executada exclusivamente no **servidor**, reduzindo a carga de trabalho do cliente e melhorando a segurança e o desempenho de ponta a ponta, um conceito essencial em sistemas modernos de gestão.

***
## **🛠️ Instalação e Configuração**

Siga os passos abaixo para ter uma cópia de desenvolvimento rodando em sua máquina local.

### **Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas:

* **Node.js** (v18.x ou superior)
* **npm** (ou yarn/pnpm)
* **Git**
* **Banco de Dados** (PostgreSQL/MySQL, etc.)

### **1. Clonar o Repositório**

```bash
git clone [https://github.com/seu-usuario/seu-repo.git](https://github.com/seu-usuario/seu-repo.git)

cd Biblioteca-SAM
```

### **2. Instalar as Dependências**

```bash
npm install
```
ou

```bash
yarn install
```
ou
```bash
pnpm install
```

### **3. Configurar Variáveis de Ambiente**

Crie um arquivo ``.env.local`` na raiz do projeto e preencha as variáveis necessárias para a conexão com o banco de dados e outros serviços.
Um exemplo de ``.env`` pode ser encontrado em ``env.example``


### **4. Setup do Banco de Dados**

#### Gerar as migrations com drizzle
```bash
npm run db:generate
```

#### Aplica as migrações no banco de dados
``` bash
npm run db:migrate
```

### **5. Executando o Projeto**

Para iniciar o servidor de desenvolvimento:

``` bash
npm run dev
```
 ou
``` bash
yarn dev
```


Acesse o sistema em seu navegador: http://localhost:3000

---
## **📄 Estrutura de Pastas**

O projeto segue a convenção do **App Router** do **Next.js**:

```
├── app/                  # Rotas, layouts e páginas (SSR/RSC)
│   ├── api/              # API Routes (Endpoints REST)
│   └── view/             # VIEW Routes (Ex: Rotas do frontend)
        └── (public)/     # Rotas publicas
        └── (private)/    # Rotas protegidas por autenticação
├── components/           # Componentes React da aplicação
│   └── ui/               # Componentes Shadcn/ui customizados e reaproveitaveis 
├── lib/                  # Funções utilitárias e abstrações de serviços (DB, Auth)
├── public/               # Assets estáticos (imagens, ícones)
├── providers             # Provedores de contexto da aplicação
└── config                # Arquivos de configuração da infraestrutura
    └── db                # Setup do banco de dados