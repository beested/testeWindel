# testeWindel
Teste para Programação Web
-
Faltaram algumas coisas no projeto final, mas fiquei feliz com meu desempenho individual, com esse teste adquiri muito conhecimento, e já sei que não sou o mesmo desde quando comecei o projeto.
Consegui fazer o GET da API mas acabei não conseguindo fazer o POST da API, então voltei para o localStorage.
-


A função "saveProduto" é chamada quando o usuário clica no botão "Salvar" e ela verifica se os campos do formulário são válidos usando a função "isValidFields". Se os campos são válidos, ela cria um objeto "produto" com os valores dos campos do formulário e, dependendo do valor do índice, chama a função "createProduto" ou "updateProduto" para salvar ou atualizar o produto.

A função "createRow" é usada para criar as linhas da tabela que mostra os produtos. Ela é chamada quando os produtos são lidos ou atualizados, e ela cria um elemento "tr" e adiciona os valores do produto aos elementos "td" dentro dele.

A função "getLocalStorage" e "setLocalStorage" são usadas para ler e escrever os dados no LocalStorage.

A função "deleteProduto" é usada para deletar um produto do LocalStorage.

A função "updateProduto" é usada para atualizar um produto no LocalStorage.

A função "readProduto" é usada para ler os dados dos produtos no LocalStorage.

A função "createProduto" é usada para criar um novo produto e armazená-lo no LocalStorage.

A função "isValidFields" é usada para verificar se os campos do formulário são válidos.

A função "clearFields" é usada para limpar os campos do formulário.

A função "updateTable" é usada para atualizar a tabela após as operações CRUD.
