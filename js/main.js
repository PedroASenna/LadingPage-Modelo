(function () {
  "use strict";

  const CART_STORAGE_KEY = "sennafarma_cart_v1";
  const currencyFmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const WEEKDAY_LABELS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  /** cart = { [productId]: quantity } */
  let cart = loadCart();

  // ---------- Helpers ----------
  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      /* localStorage indisponível: carrinho segue funcionando só nesta sessão */
    }
  }

  function findProduct(id) {
    return PRODUCTS.find((p) => p.id === Number(id));
  }

  function cartCount() {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }

  function cartTotal() {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = findProduct(id);
      return product ? sum + product.price * qty : sum;
    }, 0);
  }

  function whatsappLink(number, message) {
    return `https://wa.me/${number}${message ? "?text=" + encodeURIComponent(message) : ""}`;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.hidden = true; }, 2200);
  }

  // ---------- Static WhatsApp links (header, hero, banners, footer) ----------
  function setupStaticWhatsappLinks() {
    const greetings = {
      "header-whatsapp-link": "Olá! Vim pelo site da Senna Farma e gostaria de tirar uma dúvida.",
      "hero-whatsapp-link": "Olá! Gostaria de fazer um pedido na Senna Farma.",
      "prescription-whatsapp-link": "Olá! Vou enviar a foto da minha receita para verificar a disponibilidade do medicamento.",
      "location-whatsapp-link": "Olá! Vim pelo site e gostaria de mais informações.",
      "promo-whatsapp-link": "Olá! Quero receber as promoções da Senna Farma no WhatsApp.",
      "footer-whatsapp-link": "Olá! Vim pelo site da Senna Farma.",
    };
    Object.entries(greetings).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.href = whatsappLink(STORE.whatsappNumber, text);
    });

    const floating = document.getElementById("floating-whatsapp");
    floating.href = whatsappLink(STORE.whatsappNumber, "Olá! Vim pelo site da Senna Farma.");

    const directions = document.getElementById("maps-directions-link");
    directions.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.mapsQuery)}`;
  }

  // ---------- Horário de funcionamento ----------
  function renderOpenStatus() {
    const now = new Date();
    const today = now.getDay();
    const todayHours = STORE.hours[today];
    const statusEl = document.getElementById("open-status");

    const isOpenNow = (() => {
      if (!todayHours) return false;
      const [oh, om] = todayHours.open.split(":").map(Number);
      const [ch, cm] = todayHours.close.split(":").map(Number);
      const openMinutes = oh * 60 + om;
      const closeMinutes = ch * 60 + cm;
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      return nowMinutes >= openMinutes && nowMinutes < closeMinutes;
    })();

    statusEl.classList.remove("open", "closed");
    if (isOpenNow) {
      statusEl.textContent = `Aberto agora · Fecha às ${todayHours.close}`;
      statusEl.classList.add("open");
    } else {
      statusEl.textContent = "Fechado no momento · Confira nossos horários abaixo";
      statusEl.classList.add("closed");
    }
  }

  function renderHoursTable() {
    const table = document.getElementById("hours-table");
    const today = new Date().getDay();
    table.innerHTML = WEEKDAY_LABELS.map((label, idx) => {
      const hours = STORE.hours[idx];
      const text = hours ? `${hours.open} - ${hours.close}` : "Fechado";
      return `<tr class="${idx === today ? "today" : ""}"><td>${label}</td><td>${text}</td></tr>`;
    }).join("");
  }

  // ---------- Catálogo ----------
  let activeCategory = "todos";
  let searchTerm = "";

  function renderCategoryChips() {
    const container = document.getElementById("category-chips");
    const chips = CATEGORIES.map(
      (c) => `<button class="chip" data-category="${c.id}" role="tab" aria-selected="false">${c.icon} ${c.label}</button>`
    ).join("");
    container.insertAdjacentHTML("beforeend", chips);

    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      activeCategory = btn.dataset.category;
      container.querySelectorAll(".chip").forEach((c) => {
        const isActive = c === btn;
        c.classList.toggle("active", isActive);
        c.setAttribute("aria-selected", String(isActive));
      });
      renderProducts();
    });
  }

  function getFilteredProducts() {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "todos" || p.category === activeCategory;
      const matchesSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm) || p.desc.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }

  function productCardHTML(product) {
    const qty = cart[product.id] || 0;
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image" aria-hidden="true">${product.icon}</div>
        ${product.promo ? '<span class="product-badge">Oferta</span>' : ""}
        <p class="product-name">${product.name}</p>
        <p class="product-desc">${product.desc}</p>
        ${product.needsPrescription ? '<p class="product-rx">⚠️ Requer receita médica</p>' : ""}
        <div>
          <span class="product-price">${currencyFmt.format(product.price)}</span>
          <span class="product-unit"> / ${product.unit}</span>
        </div>
        <div class="product-footer">
          <div class="qty-stepper" data-id="${product.id}">
            <button type="button" class="qty-minus" aria-label="Diminuir quantidade">−</button>
            <span class="qty-value">${qty}</span>
            <button type="button" class="qty-plus" aria-label="Aumentar quantidade">+</button>
          </div>
          <button type="button" class="add-btn" data-id="${product.id}">Adicionar</button>
        </div>
      </article>
    `;
  }

  function renderProducts() {
    const grid = document.getElementById("product-grid");
    const emptyMsg = document.getElementById("empty-products");
    const filtered = getFilteredProducts();

    grid.innerHTML = filtered.map(productCardHTML).join("");
    emptyMsg.hidden = filtered.length > 0;
  }

  function setupCatalogEvents() {
    document.getElementById("search-input").addEventListener("input", (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      renderProducts();
    });

    document.getElementById("product-grid").addEventListener("click", (e) => {
      const stepper = e.target.closest(".qty-stepper");
      const addBtn = e.target.closest(".add-btn");

      if (stepper) {
        const valueEl = stepper.querySelector(".qty-value");
        let val = Number(valueEl.textContent);
        if (e.target.classList.contains("qty-plus")) val += 1;
        if (e.target.classList.contains("qty-minus")) val = Math.max(0, val - 1);
        valueEl.textContent = val;
        stepper.dataset.pending = val;
        return;
      }

      if (addBtn) {
        const id = addBtn.dataset.id;
        const card = addBtn.closest(".product-card");
        const stepperEl = card.querySelector(".qty-stepper");
        const pending = Number(stepperEl.dataset.pending || stepperEl.querySelector(".qty-value").textContent);
        const qtyToAdd = pending > 0 ? pending : 1;
        addToCart(id, qtyToAdd);
        stepperEl.dataset.pending = 0;
        stepperEl.querySelector(".qty-value").textContent = "0";
        const product = findProduct(id);
        showToast(`${product.name} adicionado ao carrinho`);
      }
    });
  }

  // ---------- Carrinho ----------
  function addToCart(id, qty) {
    id = Number(id);
    cart[id] = (cart[id] || 0) + qty;
    saveCart();
    renderCartUI();
  }

  function setQuantity(id, qty) {
    id = Number(id);
    if (qty <= 0) {
      delete cart[id];
    } else {
      cart[id] = qty;
    }
    saveCart();
    renderCartUI();
  }

  function removeFromCart(id) {
    delete cart[Number(id)];
    saveCart();
    renderCartUI();
  }

  function cartItemHTML(id, qty) {
    const product = findProduct(id);
    if (!product) return "";
    return `
      <div class="cart-item" data-id="${product.id}">
        <div class="cart-item-icon" aria-hidden="true">${product.icon}</div>
        <div class="cart-item-info">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${currencyFmt.format(product.price)} × ${qty} = ${currencyFmt.format(product.price * qty)}</p>
        </div>
        <div class="qty-stepper" data-id="${product.id}">
          <button type="button" class="cart-qty-minus" aria-label="Diminuir quantidade">−</button>
          <span class="qty-value">${qty}</span>
          <button type="button" class="cart-qty-plus" aria-label="Aumentar quantidade">+</button>
        </div>
        <button type="button" class="cart-item-remove" data-id="${product.id}">Remover</button>
      </div>
    `;
  }

  function renderCartUI() {
    const itemsContainer = document.getElementById("cart-items");
    const emptyMsg = document.getElementById("cart-empty-msg");
    const entries = Object.entries(cart);

    if (entries.length === 0) {
      itemsContainer.innerHTML = "";
      itemsContainer.appendChild(emptyMsg);
      emptyMsg.hidden = false;
    } else {
      emptyMsg.hidden = true;
      itemsContainer.innerHTML = entries.map(([id, qty]) => cartItemHTML(id, qty)).join("");
    }

    const total = cartTotal();
    const count = cartCount();

    document.getElementById("cart-total").textContent = currencyFmt.format(total);

    const badge = document.getElementById("cart-badge");
    badge.textContent = String(count);
    badge.hidden = count === 0;

    const mobileBar = document.getElementById("mobile-cart-bar");
    mobileBar.hidden = count === 0;
    document.getElementById("mobile-cart-count").textContent = `${count} ${count === 1 ? "item" : "itens"}`;
    document.getElementById("mobile-cart-total").textContent = currencyFmt.format(total);

    // Re-render product grid so quantity badges/steppers stay in sync visually (qty stepper on cards resets after add, so nothing to sync there)
  }

  function setupCartEvents() {
    document.getElementById("cart-items").addEventListener("click", (e) => {
      const removeBtn = e.target.closest(".cart-item-remove");
      const stepper = e.target.closest(".qty-stepper");

      if (removeBtn) {
        removeFromCart(removeBtn.dataset.id);
        return;
      }
      if (stepper) {
        const id = stepper.dataset.id;
        const current = cart[id] || 0;
        if (e.target.classList.contains("cart-qty-plus")) setQuantity(id, current + 1);
        if (e.target.classList.contains("cart-qty-minus")) setQuantity(id, current - 1);
      }
    });

    document.getElementById("open-cart-btn").addEventListener("click", openCart);
    document.getElementById("mobile-cart-bar").addEventListener("click", openCart);
    document.getElementById("close-cart-btn").addEventListener("click", closeCart);
    document.getElementById("cart-overlay").addEventListener("click", closeCart);
  }

  function openCart() {
    document.getElementById("cart-overlay").hidden = false;
    document.getElementById("cart-drawer").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    document.getElementById("cart-overlay").hidden = true;
    document.getElementById("cart-drawer").hidden = true;
    document.body.style.overflow = "";
  }

  // ---------- Checkout ----------
  function setupCheckoutForm() {
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const addressField = document.getElementById("address-field");

    deliveryRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        addressField.hidden = document.querySelector('input[name="delivery"]:checked').value !== "entrega";
      });
    });

    document.getElementById("checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();

      if (cartCount() === 0) {
        showToast("Seu carrinho está vazio.");
        return;
      }

      const name = document.getElementById("customer-name").value.trim();
      const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
      const address = document.getElementById("customer-address").value.trim();
      const payment = document.getElementById("payment-method").value;
      const notes = document.getElementById("customer-notes").value.trim();

      const lines = [];
      lines.push(`Olá! Meu nome é ${name || "-"} e gostaria de fazer o seguinte pedido na *Senna Farma*:`);
      lines.push("");
      Object.entries(cart).forEach(([id, qty]) => {
        const product = findProduct(id);
        if (!product) return;
        lines.push(`• ${qty}x ${product.name} - ${currencyFmt.format(product.price * qty)}`);
      });
      lines.push("");
      lines.push(`*Total: ${currencyFmt.format(cartTotal())}*`);
      lines.push("");
      lines.push(`Entrega: ${deliveryMethod === "entrega" ? "Entrega" : "Retirada na loja"}`);
      if (deliveryMethod === "entrega" && address) {
        lines.push(`Endereço: ${address}`);
      }
      lines.push(`Pagamento: ${payment}`);
      if (notes) {
        lines.push(`Observações: ${notes}`);
      }

      const message = lines.join("\n");
      window.open(whatsappLink(STORE.whatsappNumber, message), "_blank", "noopener");
    });
  }

  // ---------- Init ----------
  function init() {
    document.getElementById("year").textContent = new Date().getFullYear();

    setupStaticWhatsappLinks();
    renderOpenStatus();
    renderHoursTable();

    renderCategoryChips();
    renderProducts();
    setupCatalogEvents();

    setupCartEvents();
    renderCartUI();

    setupCheckoutForm();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
