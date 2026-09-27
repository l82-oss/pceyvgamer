const DEFAULTS = {
  whatsapp: "593XXXXXXXXX",
  facebook: "https://facebook.com/PCEYVGAMERS",
  instagram: "https://instagram.com/PCEYVGAMERS"
};

// Contraseña inicial: PCEYVGAMERS2026
// Para cambiarla, modifica ADMIN_PASSWORD_HASH por el SHA-256 de tu nueva contraseña.
// Esto es una barrera básica del lado del cliente, NO una autenticación de servidor.
const ADMIN_PASSWORD_HASH = "a81821e038eabdc43a4f29f22b7cc50897a23dd4cae1b1a6ce3abf0e51080776";
const SESSION_KEY = "pce_admin_authenticated";

const productsDefault = [
  {id:1,cat:"GPU",name:"Tarjeta gráfica Gaming 8GB",price:299.99,old:329.99,icon:"🎮",stock:7},
  {id:2,cat:"GPU",name:"Tarjeta gráfica Gaming 12GB",price:449.99,icon:"🚀",stock:4},
  {id:3,cat:"CPU",name:"Procesador Gaming 6 núcleos",price:189.99,icon:"⚡",stock:8},
  {id:4,cat:"CPU",name:"Procesador Gaming 8 núcleos",price:269.99,icon:"🔥",stock:5},
  {id:5,cat:"RAM",name:"Memoria RAM DDR4 16GB",price:49.99,icon:"🧠",stock:15},
  {id:6,cat:"RAM",name:"Memoria RAM DDR5 32GB",price:94.99,icon:"🧠",stock:9},
  {id:7,cat:"SSD",name:"SSD NVMe 1TB",price:69.99,icon:"💾",stock:12},
  {id:8,cat:"MOTHERBOARD",name:"Placa madre Gaming",price:129.99,icon:"🔧",stock:6},
  {id:9,cat:"PERIFERICOS",name:"Teclado mecánico RGB",price:59.99,icon:"⌨️",stock:10},
  {id:10,cat:"PERIFERICOS",name:"Mouse Gaming RGB",price:29.99,icon:"🖱️",stock:20}
];

const $ = (id) => document.getElementById(id);
const loginGate = $("loginGate");
const adminApp = $("adminApp");
const loginForm = $("loginForm");
const adminPassword = $("adminPassword");
const loginError = $("loginError");

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function showAdmin() {
  loginGate.classList.add("hidden");
  adminApp.classList.remove("hidden");
  initAdmin();
}

function showLogin() {
  adminApp.classList.add("hidden");
  loginGate.classList.remove("hidden");
  adminPassword.value = "";
  adminPassword.focus();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.hidden = true;

  const hash = await sha256(adminPassword.value);
  if (hash === ADMIN_PASSWORD_HASH) {
    sessionStorage.setItem(SESSION_KEY, "1");
    showAdmin();
  } else {
    loginError.hidden = false;
    adminPassword.select();
  }
});

$("logout").addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  showLogin();
});

function initAdmin() {
  if (initAdmin.done) return;
  initAdmin.done = true;

  let config = JSON.parse(localStorage.getItem("pce_config") || "null") || {...DEFAULTS};
  let products = JSON.parse(localStorage.getItem("pce_products") || "null") || [...productsDefault];

  $("whatsapp").value = config.whatsapp || "";
  $("facebook").value = config.facebook || "";
  $("instagram").value = config.instagram || "";

  $("saveConfig").addEventListener("click", () => {
    config = {
      whatsapp: $("whatsapp").value.trim(),
      facebook: $("facebook").value.trim(),
      instagram: $("instagram").value.trim()
    };
    localStorage.setItem("pce_config", JSON.stringify(config));
    alert("Configuración guardada.");
  });

  function save() {
    localStorage.setItem("pce_products", JSON.stringify(products));
    render();
  }

  function del(index) {
    if (confirm("¿Borrar este producto?")) {
      products.splice(index, 1);
      save();
    }
  }

  window.__pceDelete = del;

  function render() {
    $("table").innerHTML = products.map((p, i) => `
      <div class="item">
        <input aria-label="Icono" value="${escapeAttr(p.icon || "")}" data-field="icon" data-index="${i}">
        <input class="wide" aria-label="Nombre" value="${escapeAttr(p.name || "")}" data-field="name" data-index="${i}">
        <input aria-label="Precio" value="${Number(p.price || 0)}" type="number" step=".01" data-field="price" data-index="${i}">
        <input aria-label="Stock" value="${Number(p.stock || 0)}" type="number" data-field="stock" data-index="${i}">
        <button class="danger" data-delete="${i}">Borrar</button>
      </div>
    `).join("");

    $("table").querySelectorAll("[data-field]").forEach(input => {
      input.addEventListener("change", () => {
        const i = Number(input.dataset.index);
        const field = input.dataset.field;
        products[i][field] = field === "price" || field === "stock"
          ? Number(input.value)
          : input.value;
        save();
      });
    });

    $("table").querySelectorAll("[data-delete]").forEach(button => {
      button.addEventListener("click", () => del(Number(button.dataset.delete)));
    });
  }

  function escapeAttr(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  $("new").addEventListener("click", () => {
    products.push({
      id: Date.now(),
      cat: "GPU",
      name: "Nuevo producto",
      price: 0,
      icon: "🖥️",
      stock: 0
    });
    save();
  });

  $("export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pceyvgamers_catalogo.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  $("import").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (!Array.isArray(imported)) throw new Error("Formato inválido");
        products = imported;
        save();
        alert("Catálogo importado.");
      } catch {
        alert("JSON inválido.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  });

  render();
}

if (sessionStorage.getItem(SESSION_KEY) === "1") {
  showAdmin();
} else {
  showLogin();
}
