const DEFAULTS={whatsapp:"593XXXXXXXXX",facebook:"https://facebook.com/PCEYVGAMERS",instagram:"https://instagram.com/PCEYVGAMERS"};
const productsDefault=[
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
const config=JSON.parse(localStorage.getItem("pce_config")||"null")||DEFAULTS;
const products=JSON.parse(localStorage.getItem("pce_products")||"null")||productsDefault;
let cart=JSON.parse(localStorage.getItem("pce_cart")||"[]");
const wa=t=>`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(t)}`;
function render(filter="TODOS",search=""){let list=filter==="TODOS"?products:products.filter(p=>p.cat===filter);if(search)list=list.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.cat.toLowerCase().includes(search.toLowerCase()));document.querySelector("#products").innerHTML=list.map(p=>`<article class="card"><div class="pic">${p.icon||"🖥️"}</div><div class="body"><span class="tag">${p.cat}</span><h3>${p.name}</h3><div><span class="price">$${Number(p.price).toFixed(2)}</span>${p.old?`<span class="old">$${Number(p.old).toFixed(2)}</span>`:""}</div><div class="stock">● ${p.stock>0?"Disponible":"Agotado"} ${p.stock>0?"· "+p.stock+" unidades":""}</div><button class="btn primary add" onclick="add(${p.id})" ${p.stock<=0?"disabled":""}>Agregar al carrito</button></div></article>`).join("")||"<p>No encontramos productos.</p>";}
function add(id){const p=products.find(x=>x.id===id);if(!p||p.stock<=0)return;cart.push(p);save();document.querySelector("#cartBtn").animate([{transform:"scale(1.1)"},{transform:"scale(1)"}],{duration:200});}
function save(){localStorage.setItem("pce_cart",JSON.stringify(cart));document.querySelector("#count").textContent=cart.length;cartRender();}
function cartRender(){const box=document.querySelector("#items");if(!cart.length){box.innerHTML="<p style='color:#9eabbc'>Tu carrito está vacío.</p>";document.querySelector("#total").textContent="$0.00";return}box.innerHTML=cart.map((p,i)=>`<div class="line"><span>${p.icon||"🖥️"} ${p.name}</span><b>$${Number(p.price).toFixed(2)} <button onclick="removeItem(${i})" style="background:none;border:0;color:#ff7186;cursor:pointer">×</button></b></div>`).join("");document.querySelector("#total").textContent="$"+cart.reduce((s,p)=>s+Number(p.price),0).toFixed(2);}
function removeItem(i){cart.splice(i,1);save()}
function send(){if(!cart.length)return alert("El carrito está vacío.");let total=cart.reduce((s,p)=>s+Number(p.price),0);let lines=cart.map(p=>`- ${p.name}: $${Number(p.price).toFixed(2)}`).join("\n");open(wa(`Hola PCEYVGAMERS. Quiero realizar este pedido:\n\n${lines}\n\nTotal: $${total.toFixed(2)}\n\nDeseo confirmar disponibilidad, envío y forma de pago.`),"_blank")}
document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)});
document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{document.querySelector(`[data-filter="${b.dataset.cat}"]`).click();document.querySelector("#productos").scrollIntoView()});
document.querySelector("#cartBtn").onclick=()=>document.querySelector("#modal").classList.remove("hide");
document.querySelector(".x").onclick=()=>document.querySelector("#modal").classList.add("hide");
document.querySelector("#empty").onclick=()=>{cart=[];save()};
document.querySelector("#send").onclick=send;
document.querySelector("#heroWA").href=wa("Hola PCEYVGAMERS, quiero cotizar una PC/componentes.");
document.querySelector("#offerWA").href=wa("Hola PCEYVGAMERS, quiero ayuda para armar una PC.");
document.querySelector("#wa").href=wa("Hola PCEYVGAMERS, necesito información.");
document.querySelector("#fb").href=config.facebook;document.querySelector("#ig").href=config.instagram;
document.querySelector("#year").textContent=new Date().getFullYear();
document.querySelector("#searchBtn").onclick=()=>{const q=prompt("¿Qué producto buscas?");if(q!==null){document.querySelector("#productos").scrollIntoView();render("TODOS",q)}};
render();save();