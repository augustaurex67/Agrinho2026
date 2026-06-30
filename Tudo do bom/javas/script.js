// 1. Banco de Dados dos Produtos
const produtos = [
  { id: 1, nome: "Tomate", cat: "Frutas", preco: 8.90, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400" }, // Atualizado para uma URL estável
  { id: 2, nome: "Alface", cat: "Verduras", preco: 4.50, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400" },
  { id: 3, nome: "Cenoura", cat: "Legumes", preco: 5.20, img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400" },
  { id: 4, nome: "Batata", cat: "Legumes", preco: 6.80, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400" },
  { id: 5, nome: "Cebola", cat: "Legumes", preco: 5.90, img: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400" },
  { id: 6, nome: "Maçã", cat: "Frutas", preco: 9.50, img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400" },
  { id: 7, nome: "Banana", cat: "Frutas", preco: 6.20, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400" },
  { id: 8, nome: "Laranja", cat: "Frutas", preco: 4.80, img: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400" },
  { id: 9, nome: "Mamão", cat: "Frutas", preco: 7.40, img: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400" },
  { id: 10, nome: "Abacate", cat: "Frutas", preco: 8.20, img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400" },
  { id: 11, nome: "Arroz", cat: "Grãos", preco: 28.90, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
  { id: 12, nome: "Feijão Carioca", cat: "Grãos", preco: 9.90, img: "https://images.unsplash.com/photo-1552030974-43d693959137?w=400" },
  { id: 13, nome: "Milho em Espiga", cat: "Grãos", preco: 3.50, img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400" }
];

// 2. Estado da Aplicação (Variáveis Globais)
let carrinho = [];
let categoriaAtual = 'Todos';

// Inicialização do Sistema ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  setupNavegacao();
  renderCategorias();
  renderProducts();
  renderDestaques();
});

// Sistema de Navegação entre Abas/Páginas
function setupNavegacao() {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Altera classe ativa dos botões
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Altera a página visível
      const pageId = `page-${btn.dataset.page}`;
      document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
      document.getElementById(pageId).classList.add("active");
    });
  });
}

function goToProdutos() {
  // Pega o termo buscado na página inicial e joga para o campo de busca da página de produtos
  const termo = document.getElementById("searchInput").value;
  document.getElementById("searchInput2").value = termo;
  
  // Simula o clique na aba de produtos
  document.querySelector('[data-page="produtos"]').click();
  renderProducts();
}

// Renderização de Produtos e Destaques
function renderDestaques() {
  const container = document.getElementById("destaques");
  // Seleciona os 4 primeiros produtos como destaque
  const destaques = produtos.slice(0, 4);
  
  container.innerHTML = destaques.map(p => geradorCardHTML(p)).join('');
}

function renderCategorias() {
  const container = document.getElementById("categorias");
  // categorias únicas
  const listaCategorias = ['Todos', ...new Set(produtos.map(p => p.cat))];
  
  container.innerHTML = listaCategorias.map(cat => `
    <button class="cat-btn ${cat === categoriaAtual ? 'active' : ''}" onclick="filtrarCategoria('${cat}', this)">
      ${cat}
    </button>
  `).join('');
}

function filtrarCategoria(cat, elemento) {
  categoriaAtual = cat;
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  elemento.classList.add("active");
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("produtos");
  const termoBusca = document.getElementById("searchInput2").value.toLowerCase();
  
  //categoria e termo de busca
  const produtosFiltrados = produtos.filter(p => {
    const matchesCat = (categoriaAtual === 'Todos' || p.cat === categoriaAtual);
    const matchesBusca = p.nome.toLowerCase().includes(termoBusca);
    return matchesCat && matchesBusca;
  });

  if(produtosFiltrados.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#888;">Nenhum produto encontrado.</p>`;
    return;
  }

  container.innerHTML = produtosFiltrados.map(p => geradorCardHTML(p)).join('');
}

function geradorCardHTML(p) {
  return `
    <div class="card">
      <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://placehold.co/400x300?text=${p.nome}'">
      <div class="card-body">
        <h3>${p.nome}</h3>
        <span class="cat">${p.cat}</span>
        <div class="price">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
        <button class="add-btn" onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
      </div>
    </div>
  `;
}

//Gerenciamento do Carrinho de Compras
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("show");
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const itemNoCarrinho = carrinho.find(item => item.id === id);

  if (itemNoCarrinho) {
    itemNoCarrinho.qtd++;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }

  atualizarCarrinho();
}

function alterarQuantidade(id, mudanca) {
  const item = carrinho.find(item => item.id === id);
  if (!item) return;

  item.qtd += mudanca;
  if (item.qtd <= 0) {
    carrinho = carrinho.filter(item => item.id !== id);
  }
  
  atualizarCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  //contador do cabeçalho
  const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);
  document.getElementById("cartCount").innerText = totalItens;

  // Atualiza a lista visual do carrinho
  const container = document.getElementById("cartItems");
  const totalContainer = document.getElementById("cartTotal");

  if (carrinho.length === 0) {
    container.innerHTML = `<p style="color:#888; text-align:center; margin-top:20px;">Carrinho vazio.</p>`;
    totalContainer.innerText = "Total: R$ 0,00";
    return;
  }

  let precoTotal = 0;
  container.innerHTML = carrinho.map(item => {
    const subtotal = item.preco * item.qtd;
    precoTotal += subtotal;
    return `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.nome}">
        <div class="info">
          <strong>${item.nome}</strong>
          <div>R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
          <div class="qty-ctrl">
            <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
            <span>${item.qtd}</span>
            <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
          </div>
        </div>
        <button onclick="remerverDoCarrinho(${item.id})" style="background:#e53935; margin-left:5px;">✕</button>
      </div>
    `;
  }).join('');

  totalContainer.innerText = `Total: R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
}

//Finalização
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  // Limpa o carrinho e fecha a barra lateral
  carrinho = [];
  atualizarCarrinho();
  toggleCart();
  
  // Abre o modal de sucesso
  document.getElementById("modal").classList.add("show");
}

function fecharModal() {
  document.getElementById("modal").classList.remove("show");