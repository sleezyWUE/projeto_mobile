# FashionStore Mobile - Portfólio de Desenvolvimento Mobile

Este projeto é a primeira versão de um aplicativo mobile responsivo e leve para uma loja online de moda. Desenvolvido como parte do desafio da disciplina de **Mobile Development**, o app foca na listagem de produtos por categoria, navegação intuitiva e consumo de uma API REST real.


## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

- **React (Vite)**: Biblioteca principal para construção da interface.
- **Redux Toolkit**: Gerenciamento de estado global (Auth e Products).
- **Axios**: Cliente HTTP para consumo da API DummyJSON.
- **Tailwind CSS**: Estilização baseada em utilitários para design responsivo e moderno.
- **Motion (Framer Motion)**: Animações fluidas de transição entre telas.
- **Lucide React**: Biblioteca de ícones vetoriais.
- **TypeScript**: Garantia de tipagem e segurança no desenvolvimento.

---

## Funcionalidades

1.  **Tela de Login**:
    *   Validação de campos (e-mail e senha).
    *   Simulação de autenticação com armazenamento no Redux.
2.  **Listagem de Produtos**:
    *   Navegação por abas entre categorias **Masculina** e **Feminina**.
    *   Consumo dinâmico de categorias da API DummyJSON.
    *   Tratamento de estados de *loading* e *error*.
3.  **Detalhes do Produto**:
    *   Exibição de nome, descrição, preço, desconto e imagem em alta resolução.
    *   Cálculo dinâmico de preço original vs. desconto.
4.  **Logout**:
    *   Encerramento de sessão e limpeza de dados temporários.

---

## Screenshots

Contido no PDF

## Estrutura do Projeto

```text
src/
├── components/      # Componentes reutilizáveis (MobileFrame)
├── screens/         # Telas principais (Login, Home, Detail)
├── store/           # Configuração do Redux e Slices (Auth, Products)
├── services/        # Lógica de consumo de API (via Redux Thunks)
├── types.ts         # Definições de interfaces TypeScript
├── App.tsx          # Lógica de roteamento e provedores
└── index.css        # Configurações globais de estilo e fontes
```

---

##  Instruções de Execução

Para rodar o projeto localmente, siga os passos:

1.  **Clonar o repositório**:
    ```bash
    git clone <url-do-repositorio>
    cd fashionstore-mobile
    ```

2.  **Instalar as dependências**:
    ```bash
    npm install
    ```

3.  **Executar o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

4.  **Acessar no navegador**:
    Abra [http://localhost:3000](http://localhost:3000). Para uma melhor experiência, utilize o modo de inspeção do navegador (F12) e selecione a visualização de dispositivo móvel.
