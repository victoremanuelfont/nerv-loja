/* main.js - Motor da Aplicação NERV v2.0 */

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
      // MUDANÇA: Agora o botão e a imagem são links <a>
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

// 4. NOVA FUNÇÃO: Renderizar Página de Detalhes
const carregarProduto = () => {
  // Verifica se estamos na página de produto
  const containerDetalhe = document.getElementById("produto-container");
  if (!containerDetalhe) return;

  // Pega o ID da URL (ex: ?id=2)
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get('id');

  // Busca o produto no Array
  const produto = catalogo.find(p => p.id == produtoId);

  if (!produto) {
      containerDetalhe.innerHTML = `<h2 style="color:var(--nerv-red)">ERRO: DADOS CORROMPIDOS OU INEXISTENTES.</h2>`;
      return;
  }

  // Monta o HTML do Dossiê
  // Note que usamos produto.specs para simular dados técnicos
  const specsHTML = produto.specs 
      ? Object.entries(produto.specs).map(([chave, valor]) => 
          `<div class="spec-item"><strong>${chave.toUpperCase()}:</strong> <span>${valor}</span></div>`
        ).join('')
      : '';

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

          <button class="btn-comprar">
              INICIAR REQUISIÇÃO
          </button>
      </div>
  `;
}

// 5. Configurar Busca (Mantida Igual)
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

// 6. Inicialização Global
window.addEventListener("load", () => {
  renderizarCatalogo();
  renderizarPecas();
  carregarProduto(); // Nova chamada!
  configurarBusca();
});