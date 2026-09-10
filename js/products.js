/**
 * Catálogo de produtos da Senna Farma.
 * -------------------------------------------------
 * EDITE ESTE ARQUIVO para atualizar nomes, preços, categorias e destaques.
 * Não é necessário mexer no HTML/CSS/JS do site para trocar o catálogo.
 *
 * Campos de cada produto:
 *  id        -> identificador único (não repetir)
 *  name      -> nome exibido
 *  category  -> uma das categorias abaixo (CATEGORIES)
 *  price     -> número (em reais, use ponto para centavos: 12.50)
 *  unit      -> unidade de venda (ex: "caixa", "un", "frasco")
 *  desc      -> descrição curta
 *  icon      -> emoji usado como imagem provisória do produto
 *  promo     -> true/false, exibe selo "Oferta"
 *  needsPrescription -> true/false, exibe aviso de receita obrigatória
 *
 * Os preços e itens abaixo são EXEMPLOS para você ajustar com os valores
 * reais praticados na farmácia antes de publicar para os clientes.
 */

const CATEGORIES = [
  { id: "medicamentos", label: "Medicamentos", icon: "💊" },
  { id: "higiene", label: "Higiene e Beleza", icon: "🧴" },
  { id: "bebe", label: "Bebê e Infantil", icon: "👶" },
  { id: "vitaminas", label: "Vitaminas e Suplementos", icon: "💪" },
  { id: "perfumaria", label: "Perfumaria", icon: "🌸" },
  { id: "socorros", label: "Primeiros Socorros", icon: "🩹" },
];

const PRODUCTS = [
  { id: 1, name: "Dipirona Sódica 500mg (10 comp.)", category: "medicamentos", price: 6.9, unit: "caixa", desc: "Analgésico e antitérmico, genérico.", icon: "💊", promo: true },
  { id: 2, name: "Paracetamol 750mg (20 comp.)", category: "medicamentos", price: 9.5, unit: "caixa", desc: "Alívio de dores e febre.", icon: "💊" },
  { id: 3, name: "Ibuprofeno 400mg (20 comp.)", category: "medicamentos", price: 14.9, unit: "caixa", desc: "Anti-inflamatório e analgésico.", icon: "💊" },
  { id: 4, name: "Omeprazol 20mg (28 cáps.)", category: "medicamentos", price: 18.5, unit: "caixa", desc: "Redutor de acidez estomacal.", icon: "💊" },
  { id: 5, name: "Loratadina 10mg (12 comp.)", category: "medicamentos", price: 12.0, unit: "caixa", desc: "Antialérgico de uso diário.", icon: "💊" },
  { id: 6, name: "Amoxicilina 500mg (21 cáps.)", category: "medicamentos", price: 22.9, unit: "caixa", desc: "Antibiótico.", icon: "💊", needsPrescription: true },

  { id: 7, name: "Sabonete Líquido Antibacteriano 250ml", category: "higiene", price: 11.9, unit: "frasco", desc: "Limpeza suave para as mãos.", icon: "🧴" },
  { id: 8, name: "Shampoo Anticaspa 350ml", category: "higiene", price: 24.9, unit: "frasco", desc: "Controle de caspa e oleosidade.", icon: "🧴", promo: true },
  { id: 9, name: "Escova de Dente Macia", category: "higiene", price: 7.5, unit: "un", desc: "Cerdas macias, cabo ergonômico.", icon: "🧴" },
  { id: 10, name: "Desodorante Aerosol 150ml", category: "higiene", price: 16.9, unit: "un", desc: "Proteção 48h.", icon: "🧴" },
  { id: 11, name: "Fio Dental 50m", category: "higiene", price: 6.9, unit: "un", desc: "Limpeza interdental diária.", icon: "🧴" },

  { id: 12, name: "Fralda Infantil Pacote M (28 un.)", category: "bebe", price: 39.9, unit: "pacote", desc: "Alta absorção, toque macio.", icon: "👶" },
  { id: 13, name: "Lenço Umedecido (96 un.)", category: "bebe", price: 15.9, unit: "pacote", desc: "Limpeza delicada para o bebê.", icon: "👶" },
  { id: 14, name: "Pomada para Assaduras 45g", category: "bebe", price: 19.5, unit: "bisnaga", desc: "Protege e trata a pele sensível.", icon: "👶" },

  { id: 15, name: "Vitamina C 1g (10 comp. efervescentes)", category: "vitaminas", price: 13.9, unit: "tubo", desc: "Reforço para a imunidade.", icon: "💪" },
  { id: 16, name: "Complexo B (30 cáps.)", category: "vitaminas", price: 21.9, unit: "frasco", desc: "Apoio ao metabolismo energético.", icon: "💪" },
  { id: 17, name: "Ômega 3 1000mg (60 cáps.)", category: "vitaminas", price: 34.9, unit: "frasco", desc: "Saúde cardiovascular.", icon: "💪", promo: true },

  { id: 18, name: "Perfume Body Splash 200ml", category: "perfumaria", price: 29.9, unit: "frasco", desc: "Fragrância suave de longa duração.", icon: "🌸" },
  { id: 19, name: "Hidratante Corporal 400ml", category: "perfumaria", price: 18.9, unit: "frasco", desc: "Hidratação por 24h.", icon: "🌸" },

  { id: 20, name: "Álcool 70% 1L", category: "socorros", price: 12.9, unit: "frasco", desc: "Antisséptico de uso geral.", icon: "🩹" },
  { id: 21, name: "Curativos Adesivos (20 un.)", category: "socorros", price: 8.9, unit: "caixa", desc: "Para pequenos ferimentos.", icon: "🩹" },
  { id: 22, name: "Termômetro Digital", category: "socorros", price: 24.9, unit: "un", desc: "Medição rápida e precisa.", icon: "🩹" },
  { id: 23, name: "Soro Fisiológico 100ml", category: "socorros", price: 5.9, unit: "frasco", desc: "Higiene nasal e ocular.", icon: "🩹" },
];
