# e-Gest - Sistema de Gestão de Pessoas e Endereços

**e-Gest** é um sistema de gestão voltado para o gerenciamento eficiente de pessoas e endereços, oferecendo funcionalidades completas de cadastro, visualização, e busca de pessoas por CPF e muito mais. Desenvolvido com uma interface moderna e agradável utilizando **React**, **Next.js**, e **Tailwind CSS**.

<img src="./public/images/readme/home.png" alt="Homepage" width="600"/>

## Funcionalidades

### 🔐 Autenticação de Usuários

- **Login**: Sistema de autenticação seguro e simples.
- **Cadastro**: Permite registrar novos usuários no sistema com validação de dados.

<video autoplay loop muted playsinline width="600">
  <source src="./public/videos/login.mp4" type="video/mp4" >
  Seu navegador não suporta a tag de vídeo.
</video>

### 👤 Gestão de Pessoas

- **Visualização de Pessoas**: Exibe dados detalhados de pessoas, como nome, email, endereço, e avatar personalizado.
- **Busca por CPF**: Realize buscas rápidas e eficientes por pessoas com base no CPF.
- **Cadastro de pessoas**: Realiza o cadastro de diferentes pessoas no sistema com validação de dados.
- **Cadastro de endereços**: Realiza o cadastro de diferentes endereços com vinculo a pessoas no sistema com validação de dados.

<div style="display: grid; grid-template-columns: repeat(2, 400px); gap: 10px;">
  <img src="./public/images/readme/clientmodal.png" alt="clientModal" width="400px">
  <img src="./public/images/readme/createuser.png" alt="create client" width="400px">
  <img src="./public/images/readme/search.png" alt="search by cpf" width="400px">
  <img src="./public/images/readme/usercfg.png" alt="user config" width="400px">
</div>

### 📊 Painel de Controle

- **Dashboard**: Interface intuitiva para gerenciar e visualizar dados de pessoas e endereços.

  <img src="./public/images/readme/main.png" alt="Homepage" width="600"/>

## Tecnologias Utilizadas

- **Front-end**:
  - React com TypeScript
  - Next.js para renderização de páginas
  - Tailwind CSS para estilização
  - Framer Motion para animações
  - Lucide-react para ícones

## Como Rodar o Projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/Faccin27/e-gest_front-end.git
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o projeto:

   ```bash
   npm run dev
   ```

4. Acesse o projeto no navegador:
   ```
   http://localhost:8080
   ```

## Repositório do Back-end

Você pode acessar o repositório do back-end do projeto [aqui](https://github.com/Faccin27/e-gest_back-end).

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir um PR ou relatar issues.
