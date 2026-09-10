# Senna Farma — Landing Page

Landing page para a **Senna Farma** (Farmácia em Imperatriz - MA). O cliente
navega pelo catálogo de produtos, monta o carrinho e finaliza o pedido
diretamente pelo **WhatsApp** — sem backend, sem cadastro, sem custo de
hospedagem.

## Como funciona

1. O cliente filtra/busca produtos e adiciona ao carrinho.
2. Abre o carrinho, informa nome, escolhe **retirada na loja** ou **entrega**
   (com endereço), forma de pagamento preferida e observações (ex: já tem a
   receita em mãos).
3. Ao confirmar, o site monta uma mensagem já formatada com todos os itens e
   abre o WhatsApp da farmácia com o texto preenchido — o cliente só precisa
   enviar.

Não há processamento de pagamento no site: o pagamento é sempre combinado
pelo WhatsApp (Pix, cartão ou dinheiro na entrega/retirada).

## Estrutura de arquivos

```
index.html        Estrutura da página (seções: início, produtos, avaliações, localização)
css/style.css      Todo o estilo visual (responsivo, mobile-first)
js/config.js       Telefone, endereço, horários e link do Instagram — EDITE AQUI
js/products.js     Catálogo de produtos (nome, categoria, preço, descrição) — EDITE AQUI
js/main.js         Lógica do site: filtros, busca, carrinho e montagem da mensagem do WhatsApp
```

## O que você precisa editar antes de publicar

- **`js/config.js`**: número de WhatsApp, endereço, horário de funcionamento real
  de cada dia da semana e o texto sobre taxa de entrega.
- **`js/products.js`**: troque os produtos e preços de exemplo pelos reais da
  farmácia. Cada item tem `name`, `category`, `price`, `unit`, `desc`, `icon`
  (emoji usado como imagem provisória) e pode marcar `promo: true` ou
  `needsPrescription: true`.
- Fotos reais: hoje cada produto usa um emoji como imagem provisória para não
  depender de fotos de terceiros. Se quiser fotos reais, troque o bloco
  `.product-image` em `js/main.js` por uma tag `<img>` apontando para o
  arquivo da foto.

## Funcionalidades incluídas

- Catálogo com busca por nome/descrição e filtro por categoria.
- Carrinho persistente (fica salvo no navegador do cliente via `localStorage`).
- Checkout com escolha de retirada/entrega, forma de pagamento e observações.
- Pedido final enviado pronto e formatado para o WhatsApp da farmácia.
- Botão flutuante de WhatsApp e barra fixa do carrinho no celular.
- Indicador automático de "Aberto agora" / "Fechado", calculado a partir dos
  horários em `js/config.js`.
- Banner dedicado para envio de receita médica pelo WhatsApp (medicamentos
  controlados/sob prescrição).
- Seção de avaliações com a nota do Google e link direto para todas as
  avaliações (sem inventar depoimentos).
- Mapa incorporado, botão "Como chegar" (abre rota no Google Maps) e tabela de
  horários por dia da semana.
- Chamada para lista de promoções via WhatsApp (substitui newsletter por
  e-mail, mais natural para o público da farmácia).
- SEO básico: meta tags, Open Graph e dados estruturados (`schema.org/Pharmacy`)
  para aparecer melhor no Google.
- Site 100% responsivo (testado em layout mobile e desktop) e acessível
  (navegação por teclado, `aria-label`s, texto alternativo).

## Sugestões de melhorias futuras (fora do escopo desta landing page estática)

Estas exigem um pouco mais de estrutura (backend/painel), mas valem a pena
conforme o negócio crescer:

- **Painel de administração** para editar produtos/preços sem mexer em código.
- **Estoque em tempo real** integrado ao sistema de vendas da farmácia, para
  não ofertar produtos em falta.
- **Pagamento online** (Pix automático ou cartão) direto no site, sem
  depender do WhatsApp para fechar o pagamento.
- **Rastreio de pedido** (em preparo / saiu para entrega / entregue).
- **Programa de fidelidade** (pontos, cashback ou desconto por indicação).
- **Lembrete de recompra** para medicamentos de uso contínuo (ex: "está na
  hora de comprar seu remédio de pressão?").
- **Chatbot/atendimento automático** no WhatsApp para perguntas frequentes
  (horário, endereço, status do pedido) fora do horário comercial.
- **Google Analytics/Meta Pixel** para entender quais produtos geram mais
  interesse.
- **PWA** (instalar o site como app no celular) para pedidos recorrentes mais
  rápidos.

## Como publicar (hospedagem gratuita)

Como é um site estático (HTML/CSS/JS puro, sem build), pode ser publicado
gratuitamente em poucos minutos:

- **GitHub Pages**: em *Settings → Pages* deste repositório, selecione a
  branch principal e a pasta raiz (`/`). O site fica disponível em
  `https://pedroasenna.github.io/LadingPage-Modelo/`.
- **Netlify/Vercel**: conecte este repositório e publique sem configuração
  adicional (é apenas HTML/CSS/JS estático).

## Testando localmente

Não precisa instalar nada. Basta abrir `index.html` no navegador, ou rodar um
servidor local simples:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```
