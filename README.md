<h1>Loja Onlines</h1>
<img src="https://github.com/luis-campos/loja-onlines/assets/60624512/b8e28142-e6f9-4b7a-8027-da8ef290f7a8" width="250" />
<p>O projeto Loja Onlines é um e-commerce falso criado para ser usado de base para escrita de cenários de teste, testes manuais e automação de testes.</p>

<h2>Acesso ao projeto</h2>
<p>Link do projeto: https://loja-onlines.netlify.app/</p>

<h2>📖 Regras de negócio: </h2>
<h3>Tela de Login</h3>

<img src="https://github.com/luis-campos/loja-onlines/assets/60624512/a4fec878-9a4e-479d-ba28-15a365933633" width="400" />

- O campo "Nome de usuário" não pode ser vazio, caso esteja vazio deve aparecer a mensagem de erro "Por favor, insira um nome de usuário.".
- O campo "Senha" não pode ser vazio, caso esteja vazio deve aparecer a mensagem de erro "Por favor, insira uma senha.".
- Caso nome de usuário, ou senha esteja incorreto, deve aparecer a mensagem de erro "Usuário ou senha incorretos.".
- Se nome de usuário e senha estiverem corretos, então ao clicar no botão "Entrar", o usuário deve ser direcionado para a homepage.
- Se o usuário não estiver cadastrado na plataforma e clicar no botão "Criar Conta", ele deve ser redirecionado para a tela de Cadastro de Usuário.

<h3>Tela de Cadastro de Usuário</h3>

<img src="https://github.com/luis-campos/loja-onlines/assets/60624512/5c091752-3ecb-4101-a809-e6865fe08b9f" width="400" />

- O campo "Nome de usuário" não pode ser vazio, caso esteja vazio deve aparecer a mensagem de erro "O nome de usuário deve ter pelo menos 5 caracteres.".
- O campo "Senha" não pode ser vazio e tem apenas números, caso esteja vazio, ou tenha qualquer outro caracter que não seja número deve aparecer a mensagem de erro "A senha deve ter pelo menos 5 caracteres e conter somente números.".
- O campo "Confirme a senha" tem uma validação para verificar se a senha foi digitada igualmente nos dois campos, caso as senhas estejam diferentes deve aparecer a mensagem de erro "As senhas não coincidem.".
- Se o usuário digitar um nome e senha válidos, ao clicar no botão "Cadastrar", as informações devem ser guardadas no LocalStorage e ele deve ser direcionado para a homepage.
- Caso o usuário clique no botão "Faça login", ele deve voltar para a tela de login.

<h3>Tela de Produtos</h3>

<img src="https://github.com/luis-campos/loja-onlines/assets/60624512/febb9e4b-8883-4c86-b59b-e20424c3bd27" width="400" />

- Na tela de produtos existem 15 produtos, cada um com foto, nome, descrição, preço e um botão para aumentar(+), ou diminuir(-) a quantidade.
- Ao clicar no botão de aumentar(+), ou diminuir(-) a quantidade, o valor deve ser atualizado no final na página.
- Ao clicar no botão "Comprar", os itens selecionados devem ser guardados no LocalStorage o id, nome, preço e quantidade do produto e o usuário deve ser redirecionado para a página de Checkout.

<h3>Tela de Checkout</h3>

<img src="https://github.com/luis-campos/loja-onlines/assets/60624512/3bb974ca-d3f9-43cd-ad5c-92ba360be0ea" width="400" />

- Na tela de Checkout deve ser exibido todos os produtos selecionados em forma de lista com o id, nome, preço e quantidade de cada produto e um botão para excluir o produto e o preço total.
- Ao clicar no botão "X" o produto selecionado deve ser removido da lista e o preço total deve ser atualizado.
- No campo "Email", deve ser inserido um email válido.
- Só deve aparecer os campos "Número do cartão", "Nome do Titular", "Mês", "Ano" e "CVV" quando um método de pagamento for selecionado.
- Ao clicar no botão "Voltar", o usuário deve voltar para a página de produtos.
- Ao clicar no botão "Finalizar Compra", deve ser exibida a mensagem "Compra efetuada com sucesso.".
