Desafio LuizaLabs

Para rodar o projeto siga as instruções abaixo:
`npm install`
`docker-compose up` > necessário para termos acesso ao MONGO
`npm run dev`

Vocês podem acessar todas as rotas checando a documentação em `http://localhost:3000/api-docs/`
Vocês podem executar essa migration: `npx typeorm migration:run -d src/infra/database/dataSource.ts` para
criar as collections de `clients` e de `favorites`

Qualquer dúvida, fiquem a vontade para me mandar uma mensagem ;)
