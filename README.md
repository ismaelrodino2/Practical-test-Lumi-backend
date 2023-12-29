# Projeto Lumia - Teste para Desenvolvedor Pleno Fullstack

Bem-vindo ao teste para a posição de Desenvolvedor Pleno Fullstack na Lumia! Este projeto consiste em criar um sistema web com duas telas principais: o Dashboard e a Tela de Faturas. Abaixo, você encontrará uma descrição detalhada das funcionalidades e instruções para iniciar o projeto.

## Funcionalidades

### Dashboard

No Dashboard, você terá acesso a dois gráficos essenciais:

- **Gráfico de Custos:** Exibe visualmente os custos relacionados à energia.
- **Gráfico de Energia Gasta:** Mostra o consumo de energia ao longo do tempo.

Além disso, você pode filtrar os gráficos inserindo o número do cliente da fatura e pressionando o ícone "Enviar". Para adicionar uma nova fatura ao servidor, utilize o botão de adição e envie os dados com o botão correspondente. O botão de reset permite limpar o campo de entrada do número do cliente.

### Tela de Faturas

Na Tela de Faturas, você pode realizar as seguintes ações:

- **Consulta de Fatura:** Insira o número do cliente, pressione "Enviar" e selecione o mês desejado para visualizar e baixar a fatura correspondente.

## Configuração Inicial

Antes de iniciar o desenvolvimento, siga esses passos:

1. Abra o arquivo `.env` e defina a variável `NEXT_PUBLIC_API_BASE_URL` com a URL da API que será utilizada. O endpoint da API pode ser encontrado no repositório [https://github.com/ismaelrodino2/Practical-test-Lumi-backend].

## Iniciando o Projeto

Para iniciar o projeto no frontend, siga as instruções abaixo:

1. Instale as dependências:
   ```bash
  pnpm i
  ```
2. Inicie o projeto:
   ```bash
  pnpm dev
  ```