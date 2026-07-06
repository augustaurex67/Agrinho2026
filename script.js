const produtos = [
  { id:1, nome:"Tomate", cat:"Frutas", preco:8.90, img:""},
  { id:2, nome:"Alface", cat:"Verduras", preco:4.50, img:"https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400" },
  { id:3, nome:"Cenoura", cat:"Legumes", preco:5.20, img:"https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400" },
  { id:4, nome:"Batata", cat:"Legumes", preco:6.80, img:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400" },
  { id:5, nome:"Cebola", cat:"Legumes", preco:5.90, img:"https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400" },
  { id:6, nome:"Maçã", cat:"Frutas", preco:9.50, img:"https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400" },
  { id:7, nome:"Banana", cat:"Frutas", preco:6.20, img:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400" },
  { id:8, nome:"Laranja", cat:"Frutas", preco:4.80, img:"https://images.unsplash.com/photo-1547514701-42782101795e?w=400" },
  { id:9, nome:"Mamão", cat:"Frutas", preco:7.40, img:"https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400" },
  { id:10, nome:"Abacate", cat:"Frutas", preco:8.20, img:"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400" },
  { id:11, nome:"Arroz", cat:"Grãos", preco:28.90, img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
  { id:12, nome:"Feijão Carioca", cat:"Grãos", preco:9.90, img:"https://i.pinimg.com/736x/be/58/48/be584822ec01e20458f278b6ebef2052.jpg" },
  { id:13, nome:"Milho em Espiga", cat:"Grãos", preco:3.50, img:"https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400" }
];

const carrinho = {};
let categoriaAtiva = "Todas";

function categorias(){ return ["Todas", ...new Set(produtos.map(p=>p.cat))]; }

function renderCategorias(){
  const el = document.getElementById("categorias");
  el.innerHTML = categorias().map(c=>`<button class="cat-btn ${c===categoriaAtiva?'active':''}" onclick="setCat('${c}')">${c}</button>`).join("");
}

function setCat(c){ categoriaAtiva = c; renderCategorias(); renderProducts(); }

function renderProducts(){
  const termo = (document.getElementById("searchInput2")?.value || "").toLowerCase();
  const lista = produtos.filter(p => (categoriaAtiva==="Todas"||p.cat===categoriaAtiva) && p.nome.toLowerCase().includes(termo));
  document.getElementById("produtos").innerHTML = lista.length ? lista.map(cardHTML).join("") : '<p style="color:#888;">Nenhum produto encontrado.</p>';
}

function cardHTML(p){
  return `<div class="card">
    <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/300x200/4caf50/ffffff?text=${encodeURIComponent(p.nome)}'"/>
    <div class="card-body">
      <h3>${p.nome}</h3>
      <div class="cat">${p.cat}</div>
      <div class="price">R$ ${p.preco.toFixed(2).replace('.',',')}/kg</div>
      <button class="add-btn" onclick="addCart(${p.id})">+ Adicionar</button>
    </div>
  </div>`;
}

function renderDestaques(){
  const destaques = produtos.slice(0,8);
  document.getElementById("destaques").innerHTML = destaques.map(cardHTML).join("");
}

function addCart(id){
  carrinho[id] = (carrinho[id]||0) + 1;
  atualizarCart();
  const drawer = document.getElementById("cartDrawer");
  drawer.style.transform = "scale(1.02)";
  setTimeout(()=>drawer.style.transform="",200);
}

function removeCart(id){ delete carrinho[id]; atualizarCart(); }

function changeQty(id,d){ carrinho[id]=Math.max(0,(carrinho[id]||0)+d); if(!carrinho[id]) delete carrinho[id]; atualizarCart(); }

function atualizarCart(){
  const ids = Object.keys(carrinho);
  document.getElementById("cartCount").textContent = ids.reduce((s,id)=>s+carrinho[id],0);
  const cont = document.getElementById("cartItems");
  if(!ids.length){ cont.innerHTML='<p style="color:#888;">Carrinho vazio.</p>'; document.getElementById("cartTotal").textContent="Total: R$ 0,00"; return; }
  let total = 0;
  cont.innerHTML = ids.map(id=>{
    const p = produtos.find(x=>x.id==id); const q = carrinho[id]; total += p.preco*q;
    return `<div class="cart-item">
      <img src="${p.img}" onerror="this.src='https://via.placeholder.com/50'"/>
      <div class="info">
        <strong>${p.nome}</strong><br/>
        R$ ${p.preco.toFixed(2).replace('.',',')}
        <div class="qty-ctrl">
          <button onclick="changeQty(${id},-1)">−</button>
          <span>${q}</span>
          <button onclick="changeQty(${id},1)">+</button>
        </div>
      </div>
      <button onclick="removeCart(${id})">🗑</button>
    </div>`;
  }).join("");
  document.getElementById("cartTotal").textContent = "Total: R$ " + total.toFixed(2).replace('.',',');
}

function toggleCart(){
  document.getElementById("cartDrawer").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("show");
}

function finalizarCompra(){
  if(!Object.keys(carrinho).length){ alert("Adicione produtos ao carrinho primeiro!"); return; }
  for(const k in carrinho) delete carrinho[k];
  atualizarCart(); toggleCart();
  document.getElementById("modal").classList.add("show");
}

function fecharModal(){ document.getElementById("modal").classList.remove("show"); }

function goToProdutos(){
  const termo = document.getElementById("searchInput").value;
  navTo("produtos");
  document.getElementById("searchInput2").value = termo;
  renderProducts();
}

function navTo(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("page-"+page).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active", b.dataset.page===page));
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll(".nav-btn").forEach(b=>b.addEventListener("click",()=>navTo(b.dataset.page)));

renderCategorias(); 
renderProducts(); 
renderDestaques(); 
atualizarCart();