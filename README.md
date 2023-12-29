API do Projeto Lumia - Desenvolvedor Pleno Fullstack
Bem-vindo à API do Projeto Lumia, onde gerenciamos o armazenamento de PDFs de faturas no Supabase Storage e os dados associados no Supabase, utilizando um ORM baseado em PostgreSQL. Abaixo, você encontrará informações essenciais sobre as funcionalidades da API e as instruções para iniciar o desenvolvimento.

Funcionalidades
Armazenamento de Faturas
A API está integrada ao Supabase Storage para salvar PDFs de faturas de maneira eficiente. Cada fatura é associada aos dados correspondentes no PostgreSQL.

Rotas Disponíveis
Obter uma Fatura:

Método: GET
Rota: /api/faturas/:id
Retorna os detalhes de uma fatura específica com o ID fornecido.
Obter Várias Faturas:

Método: GET
Rota: /api/faturas
Retorna uma lista de todas as faturas armazenadas.
Enviar uma Nova Fatura:

Método: POST
Rota: /api/faturas
Permite adicionar uma nova fatura ao servidor, juntamente com o PDF correspondente.
Configuração Inicial
Antes de iniciar o desenvolvimento, siga esses passos:

Instale as dependências:

bash
Copy code
pnpm i
Crie uma conta no Supabase e preencha o arquivo .env.example com as credenciais fornecidas. Além disso, defina a variável ORIGIN_URL com a URL do frontend. Em ambiente local, utilize http://localhost:3000/.

Inicie o servidor localmente:

bash
Copy code
pnpm start:dev
A API estará acessível em http://localhost:3001.

Contribuindo
Estamos abertos a contribuições para melhorar e expandir esta API. Sua participação é fundamental para o sucesso contínuo do Projeto Lumia.

Agradecemos por dedicar seu tempo e habilidades ao desenvolvimento desta API.

Equipe Lumia