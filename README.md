# TechStore - Documentação do Projeto

**TechStore** é um e-commerce fictício desenvolvido para simular um ambiente real de vendas online. O objetivo deste projeto é servir como base para estudos de desenvolvimento web e práticas de Quality Assurance (QA).

URL do projeto em produção: **[https://techstore-qa.netlify.app/](https://techstore-qa.netlify.app/)**

---

## 📌 Visão Geral

O **TechStore** busca reproduzir a experiência de um site de comércio eletrônico com páginas de produtos, navegação por categorias, carrinho de compras e seções institucionais. Além disso, o projeto fornece um espaço para exercitar boas práticas de QA, como:

* Criação e execução de **casos de teste manuais**.
* Escrita de cenários para **automação de testes end-to-end**.
* Avaliação de **usabilidade e acessibilidade**.
* Simulação de relatórios e processos de QA aplicados a um sistema real.

---

## 🧭 Funcionalidades Principais

* **Página inicial** com destaques e banners promocionais.
* **Catálogo de produtos** organizado por categorias.
* **Carrinho de compras** para adicionar/remover itens.
* **Formulário de inscrição** para receber novidades.
* **Páginas institucionais** (Sobre, Contato, Suporte, Políticas, etc.).
* **Footer** com links de navegação e redes sociais.

---

## 🧪 Testes Sugeridos

### Página Inicial

* Validar exibição correta de banners e destaques.
* Verificar navegação pelo menu superior.

### Navegação

* Acessar todas as páginas disponíveis pelo header e footer.
* Validar se os links redirecionam para os destinos corretos.

### Carrinho

* Adicionar um produto ao carrinho.
* Remover um produto do carrinho.
* Atualizar quantidades e verificar valores.

### Formulário de Inscrição

* Testar envio de e-mail válido.
* Validar mensagens de erro para e-mails inválidos.

### Acessibilidade

* Navegação via teclado (Tab/Shift+Tab).
* Leitura de conteúdos por leitor de tela.
* Contraste de cores conforme recomendações WCAG.

---

## 📋 Template de Caso de Teste

* **Título:** [Funcionalidade] O que será testado
* **Pré-condições:** estado inicial necessário
* **Passos:**

  1. ...
  2. ...
* **Resultado Esperado:** comportamento correto
* **Resultado Obtido:** (preencher durante o teste)
* **Severidade/Prioridade:** classificar impacto

---

## 🤖 Automação Recomendada

Ferramentas como **Cypress** ou **Playwright** podem ser utilizadas para:

* Testes de navegação entre páginas.
* Fluxo de adicionar e remover itens do carrinho.
* Validação do formulário de inscrição.
* Verificação de links e botões principais.

---

## ♿ Acessibilidade

Itens a serem validados:

* Presença de `alt` em todas as imagens.
* Labels adequados em inputs e botões.
* Ordem de tabulação lógica.
* Contraste de cores apropriado.

---

## 📑 Reporte de Bugs

Ao reportar um bug, inclua:

* **Título:** resumo do problema.
* **Descrição:** contexto do erro.
* **Passos para reproduzir:** lista ordenada.
* **Resultado Esperado vs Obtido.**
* **Evidências:** prints, vídeos ou logs.
* **Severidade:** blocker, crítica, maior, menor ou trivial.

---

## 🤝 Contribuição

Contribuições são bem-vindas. Para mudanças significativas, abra uma issue antes para discussão.

---
