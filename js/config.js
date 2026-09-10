/**
 * Configurações da loja.
 * -------------------------------------------------
 * EDITE ESTE ARQUIVO para atualizar telefone, endereço e horários.
 */

const STORE = {
  name: "Senna Farma",
  whatsappNumber: "5599991785902", // 55 + DDD 99 + número, somente dígitos
  phoneDisplay: "(99) 99178-5902",
  address: "Av. Itaipu, 1041 - Vila Airton Senna, Imperatriz - MA, 65914-005",
  instagram: "https://www.instagram.com/sennafarma.itz/",
  mapsQuery: "Senna Farma, Av. Itaipu, 1041, Vila Airton Senna, Imperatriz - MA, 65914-005",
  rating: 4.7,
  reviewCount: 3,

  // Frete/mínimo de pedido para entrega (ajuste ou remova o uso na mensagem se não se aplicar)
  deliveryNote: "Consulte taxa de entrega e prazo com o atendente pelo WhatsApp.",

  // Horário de funcionamento (formato 24h). Ajuste para o horário real da farmácia.
  // dayIndex: 0 = domingo, 1 = segunda, ... 6 = sábado
  hours: {
    0: null, // domingo fechado (ajuste se abrir)
    1: { open: "07:00", close: "21:00" },
    2: { open: "07:00", close: "21:00" },
    3: { open: "07:00", close: "21:00" },
    4: { open: "07:00", close: "21:00" },
    5: { open: "07:00", close: "21:00" },
    6: { open: "07:00", close: "21:00" },
  },
};
