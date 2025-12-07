/* main.js - Motor da Aplicação NERV v2.0 (Com Carrinho) */

// 1. DADOS (Mock Data)
const catalogo = [
    {
        id: 1,
        nome: "Unidade Evangelion 01",
        descricao: "Modelo de Teste. Piloto: Shinji Ikari. Capacidade Berserk latente.",
        imagem: "images/eva-01-header-laranja 1.png", 
        categoria: "eva",
        status: "Em Operação",
        specs: { altura: "80m", peso: "700t" }
    },
    {
        id: 2,
        nome: "Unidade Evangelion 02",
        descricao: "Modelo de Produção. Piloto: Asuka Langley. Otimizado para combate ágil.",
        imagem: "images/eva0202 1.png", 
        categoria: "eva",
        status: "Em Operação",
        specs: { altura: "80m", peso: "680t" }
    },
    {
        id: 3,
        nome: "Unidade Evangelion 00",
        descricao: "Protótipo. Piloto: Rei Ayanami. Blindagem reforçada.",
        imagem: "images/eva0101 1.png", 
        categoria: "eva",
        status: "Manutenção",
        specs: { altura: "80m", peso: "750t" }
    },
    {
        id: 4,
        nome: "Fuzil de Paleta",
        descricao: "Rifle de assalto padrão para Evangelions. Calibre 209mm.",
        imagem: "images/peças 1.png",
        categoria: "pecas",
        status: "Disponível",
        specs: { calibre: "209mm", alcance: "2km" }
    },
    {
        id: 5,
        nome: "Faca Progressiva",
        descricao: "Lâmina vibratória de alta frequência.",
        imagem: "images/peças 1.png",
        categoria: "pecas",
        status: "Disponível",
        specs: { tipo: "Vibro-faca", energia: "Interna" }
    },
    {
        id: 6,
        nome: "Cabo Umbilical",
        descricao: "Fonte de energia externa. Vital para operações.",
        imagem: "images/peças 1.png",
        categoria: "pecas",
        status: "Esgotado",
        specs: { comprimento: "500m", condutividade: "Alta" }
    }
  ];
  
  /* --- 1.1 SISTEMA DE CARRINHO (NOVO) --- */
  
  // Tenta ler o que já está salvo. Se não tiver nada, cria um array vazio.
  let carrinho = JSON.parse(localStorage.getItem("nerv_carrinho")) || [];
  
  // Função para atualizar o número lá no topo do site (badge)
  const atualizarContador = () => {
      const contador = document.getElementById("contagem-carrinho");
      if (contador) {
          contador.innerText = carrinho.length;
          // Efeito visual: se tiver item, adiciona a classe ativo
          if (carrinho.length > 0) {
              contador.classList.add("ativo");
          } else {
              contador.classList.remove("ativo");
          }
      }
  }
  
  // Função Principal: Adicionar item ao clicar no botão
  const adicionarAoCarrinho = (id) => {
      // Procura o produto no banco de dados
      const produto = catalogo.find(p => p.id === id);
      
      if (produto) {
          carrinho.push(produto); // Adiciona na memória RAM
          localStorage.setItem("nerv_carrinho", JSON.stringify(carrinho)); // Salva no HD (Navegador)
          atualizarContador(); // Atualiza a tela imediatamente
          alert(`REQUISIÇÃO ACEITA: ${produto.nome} adicionado à lista.`);
      }
  }
  
  
  // 2. FUNÇÃO: Renderizar Catálogo (Com Links)
  const renderizarCatalogo = (lista = catalogo) => {
    const container = document.querySelector(".card-wrapper");
    if (!container) return; 
  
    container.innerHTML = "";
    const evas = lista.filter(item => item.categoria === "eva");
  
    if (evas.length === 0) {
        container.innerHTML = `<h3 style="color:var(--nerv-orange)">Nenhum EVA encontrado.</h3>`;
        return;
    }
  
    evas.forEach(item => {
        const cardHTML = `
            <div class="card-item" id="produto-${item.id}">
                <a href="produto.html?id=${item.id}">
                    <img src="${item.imagem}" alt="${item.nome}">
                </a>
                <div class="card-content">
                    <h3>${item.nome}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted); text-align: center; margin-bottom: 10px;">
                        ${item.descricao}
                    </p>
                    <a href="produto.html?id=${item.id}" style="width: 100%;">
                        <button type="button">SOLICITAR ACESSO</button>
                    </a>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
  }
  
  // 3. FUNÇÃO: Renderizar Peças (Com Links)
  const renderizarPecas = () => {
    const container = document.querySelector(".pecas-card-block");
    if (!container) return; 
  
    container.innerHTML = "";
    const pecas = catalogo.filter(item => item.categoria === "pecas");
  
    pecas.forEach(item => {
        const pecaHTML = `
            <a href="produto.html?id=${item.id}" style="text-decoration:none;">
                <div class="pecas-card-item">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="pecas-texto-conteudo">
                        <h3>${item.nome}</h3>
                        <p>${item.descricao}</p>
                    </div>
                </div>
            </a>
        `;
        container.innerHTML += pecaHTML;
    });
  }
  
  // 4. FUNÇÃO: Renderizar Página de Detalhes (ATUALIZADA)
  const carregarProduto = () => {
    const containerDetalhe = document.getElementById("produto-container");
    if (!containerDetalhe) return;
  
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');
  
    const produto = catalogo.find(p => p.id == produtoId);
  
    if (!produto) {
        containerDetalhe.innerHTML = `<h2 style="color:var(--nerv-red)">ERRO: DADOS CORROMPIDOS OU INEXISTENTES.</h2>`;
        return;
    }
  
    const specsHTML = produto.specs 
        ? Object.entries(produto.specs).map(([chave, valor]) => 
            `<div class="spec-item"><strong>${chave.toUpperCase()}:</strong> <span>${valor}</span></div>`
          ).join('')
        : '';
  
    // MUDANÇA AQUI: Adicionado o onclick="adicionarAoCarrinho(...)" no botão
    containerDetalhe.innerHTML = `
        <div class="coluna-img">
            <img src="${produto.imagem}" alt="${produto.nome}">
        </div>
        <div class="coluna-info">
            <div class="tag-status">STATUS: ${produto.status.toUpperCase()}</div>
            <h1>${produto.nome}</h1>
            <p class="descricao">${produto.descricao}</p>
            
            <div class="specs">
                ${specsHTML}
            </div>
  
            <button class="btn-comprar" onclick="adicionarAoCarrinho(${produto.id})">
                INICIAR REQUISIÇÃO
            </button>
        </div>
    `;
  }
  
  // 5. Configurar Busca
  const configurarBusca = () => {
    const inputBusca = document.querySelector(".search-input");
    const botaoBusca = document.querySelector(".search-button");
    if (!inputBusca || !botaoBusca) return;
  
    const realizarBusca = () => {
        const termo = inputBusca.value.toLowerCase();
        const resultados = catalogo.filter(item => item.nome.toLowerCase().includes(termo));
        renderizarCatalogo(resultados);
    };
  
    botaoBusca.addEventListener("click", realizarBusca);
    inputBusca.addEventListener("keypress", (e) => {
        if (e.key === "Enter") realizarBusca();
    });
  }
  
 /* --- FUNÇÃO MOBILE: Menu Hambúrguer (CORRIGIDA) --- */
// Usamos window.toggleMenu para garantir que o HTML enxergue a função
window.toggleMenu = () => {
    const menuLista = document.querySelector("nav ul");
    const menuBotao = document.querySelector(".menu-toggle");
    
    if (menuLista) {
        // Adiciona/Remove a classe 'ativo' que faz o menu aparecer
        menuLista.classList.toggle("ativo");
        
        // Troca o ícone de ☰ para X
        if (menuLista.classList.contains("ativo")) {
            menuBotao.innerText = "✕";
        } else {
            menuBotao.innerText = "☰";
        }
    }
}

// 6. Inicialização Global
window.addEventListener("load", () => {
  renderizarCatalogo();
  renderizarPecas();
  carregarProduto();
  configurarBusca();
  atualizarContador();
  // NOTA: Não chamamos o toggleMenu() aqui, ele só roda quando clica no botão!
});