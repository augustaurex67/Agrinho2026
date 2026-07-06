const produtos = [
  { id:1, nome:"Tomate", cat:"Frutas", preco:8.90, img:"data:image/jpeg;base64,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"},
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