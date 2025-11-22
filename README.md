📚 Biblioteca - SAM (Sistema de Acervo e Monitoramento)

O Biblioteca - SAM é uma plataforma monolítica e robusta para o gerenciamento de acervo, usuários e processos de empréstimo/devolução de uma biblioteca acadêmica ou institucional.

Utilizando o poder do Next.js 14, garantimos uma aplicação de alto desempenho, acessível e com uma experiência de usuário fluida.

🚀 Tecnologias

Este projeto foi construído sobre uma arquitetura moderna e coesa:

Next.js 14 (App Router): Core do sistema, provendo estrutura monolítica (Frontend + Backend), Server-Side Rendering (SSR) e React Server Components (RSC) para máxima performance.

TypeScript: Linguagem principal para desenvolvimento, garantindo segurança e escalabilidade através da tipagem estrita.

Shadcn/ui: Biblioteca de componentes de UI minimalistas e acessíveis, customizáveis e integrados perfeitamente com o Tailwind CSS.

Tailwind CSS: Framework utilitário para estilização rápida e responsiva.

ORM (Ex: Prisma / Drizzle): (Inserir a ORM utilizada) para comunicação eficiente e tipada com o banco de dados.

🏛️ Arquitetura (Monolito SSR)

Adotamos a estratégia Monolítica Next.js para simplificar o ciclo de desenvolvimento e deployment, mantendo a responsabilidade do Frontend e Backend no mesmo repositório e aplicação.

O uso intensivo de Server Components permite que a lógica de acesso a dados e de negócio mais crítica seja executada exclusivamente no servidor, reduzindo a carga de trabalho do cliente e melhorando a segurança e o desempenho de ponta a ponta, um conceito essencial em sistemas modernos de gestão.

🛠️ Instalação e Configuração

Siga os passos abaixo para ter uma cópia de desenvolvimento rodando em sua máquina local.

Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

Node.js (v18.x ou superior)

npm (ou yarn/pnpm)

Git

Banco de Dados (PostgreSQL/MySQL, etc.)

1. Clonar o Repositório

git clone [https://github.com/seu-usuario/seu-repo.git](https://github.com/seu-usuario/seu-repo.git)
cd Biblioteca-SAM


2. Instalar as Dependências

npm install
# ou
yarn install


3. Configurar Variáveis de Ambiente

Crie um arquivo .env.local na raiz do projeto e preencha as variáveis necessárias para a conexão com o banco de dados e outros serviços.

# URL de conexão com o Banco de Dados (ex: Prisma)
DATABASE_URL="mysql://user:password@host:port/database"

# Variáveis do NextAuth (se for usar autenticação)
AUTH_SECRET="SEGREDO_FORTE_AQUI"
NEXT_PUBLIC_APP_URL="http://localhost:3000"


4. Setup do Banco de Dados (Exemplo com Prisma)

Se estiver utilizando um ORM como o Prisma:

# Aplica as migrações no banco de dados
npx prisma migrate dev --name init

# Gera o cliente Prisma tipado
npx prisma generate


🏃 Executando o Projeto

Para iniciar o servidor de desenvolvimento:

npm run dev
# ou
yarn dev


Acesse o sistema em seu navegador: http://localhost:3000

📄 Estrutura de Pastas

O projeto segue a convenção do App Router do Next.js:

.
├── app/                  # Rotas, layouts e páginas (SSR/RSC)
│   ├── api/              # API Routes (Endpoints REST)
│   └── (dashboard)/      # Grupos de rotas (Ex: Área Administrativa)
├── components/           # Componentes React da aplicação
│   └── ui/               # Componentes Shadcn/ui customizados
├── lib/                  # Funções utilitárias e abstrações de serviços (DB, Auth)
└── public/               # Assets estáticos (imagens, ícones)


🤝 Contribuição

Gostaríamos muito de contar com sua contribuição!

Faça o fork do projeto.

Crie sua branch de recurso (git checkout -b feature/AmazingFeature).

Faça o commit das suas alterações (git commit -m 'Add some AmazingFeature').

Faça o push para a branch (git push origin feature/AmazingFeature).

Abra um Pull Request.