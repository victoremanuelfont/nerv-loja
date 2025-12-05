/* main.js - Motor da Aplicação NERV */

// 1. O "Banco de Dados" (Array de Objetos)
// Aqui simulamos a resposta que viria do servidor
const catalogo = [
  {
      id: 1,
      nome: "Unidade Evangelion 01",
      descricao: "Modelo de Teste. Piloto: Shinji Ikari. Capacidade Berserk latente.",
      imagem: "images/eva-01-header-laranja 1.png", 
      categoria: "eva",
      status: "disponivel"
  },
  {
      id: 2,
      nome: "Unidade Evangelion 02",
      descricao: "Modelo de Produção. Piloto: Asuka Langley. Otimizado para combate ágil.",
      imagem: "images/eva0202 1.png", 
      categoria: "eva",
      status: "disponivel"
  },
  {
      id: 3,
      nome: "Unidade Evangelion 00",
      descricao: "Protótipo. Piloto: Rei Ayanami. Blindagem reforçada.",
      imagem: "images/eva0101 1.png", 
      categoria: "eva",
      status: "manutencao"
  },
  {
      id: 4,
      nome: "Fuzil de Paleta",
      descricao: "Rifle de assalto padrão para Evangelions. Calibre 209mm.",
      imagem: "images/peças 1.png",
      categoria: "pecas",
      status: "disponivel"
  },
  {
      id: 5,
      nome: "Faca Progressiva",
      descricao: "Lâmina vibratória de alta frequência.",
      imagem: "images/peças 1.png",
      categoria: "pecas",
      status: "disponivel"
  },
  {
      id: 6,
      nome: "Cabo Umbilical",
      descricao: "Fonte de energia externa. Vital para operações.",
      imagem: "images/peças 1.png",
      categoria: "pecas",
      status: "esgotado"
  }
];

// Teste de conexão
console.log("Sistema MAGI Iniciado. Carregando " + catalogo.length + " itens.");

// 2. A Mágica de Renderização (Agora mais inteligente)
// A função agora aceita um parâmetro 'lista'. Se ninguém passar nada, ela usa o 'catalogo' completo.
const renderizarCatalogo = (lista = catalogo) => {
  const container = document.querySelector(".card-wrapper");
  if (!container) return; // Segurança

  container.innerHTML = ""; // Limpa o palco

  // Se a lista estiver vazia (busca não achou nada)
  if (lista.length === 0) {
      container.innerHTML = `
          <div style="width:100%; text-align:center; color: var(--nerv-orange);">
              <h3>NENHUM DADO ENCONTRADO</h3>
              <p>Verifique a sintaxe ou consulte o MAGI.</p>
          </div>
      `;
      return;
  }

  // Renderiza os itens da lista que foi passada
  lista.forEach(item => {
      const cardHTML = `
          <div class="card-item" id="produto-${item.id}">
              <img src="${item.imagem}" alt="${item.nome}">
              <div class="card-content">
                  <h3>${item.nome}</h3>
                  <p style="font-size: 0.9rem; color: var(--text-muted); text-align: center; margin-bottom: 10px;">
                      ${item.descricao}
                  </p>
                  <button type="button">SOLICITAR ACESSO</button>
              </div>
          </div>
      `;
      container.innerHTML += cardHTML;
  });
}

// 3. Lógica de Pesquisa (O Cérebro da Busca)
const configurarBusca = () => {
  const inputBusca = document.querySelector(".search-input");
  const botaoBusca = document.querySelector(".search-button");

  // Se não tiver busca nessa página (ex: Home), sai da função
  if (!inputBusca || !botaoBusca) return;

  // Função que faz a filtragem
  const realizarBusca = () => {
      const termoDigitado = inputBusca.value.toLowerCase(); // Transforma tudo em minúsculo

      // O GRANDE FILTRO:
      // Cria uma nova lista apenas com itens onde o NOME inclui o TERMO DIGITADO
      const resultadosFiltrados = catalogo.filter(item => 
          item.nome.toLowerCase().includes(termoDigitado)
      );

      // Manda desenhar na tela apenas os filtrados
      renderizarCatalogo(resultadosFiltrados);
  };

  // Ouve o clique no botão
  botaoBusca.addEventListener("click", realizarBusca);

  // Ouve a tecla "Enter" no campo de texto (UX Melhorada)
  inputBusca.addEventListener("keypress", (e) => {
      if (e.key === "Enter") realizarBusca();
  });
}

// 4. Inicialização
window.addEventListener("load", () => {
  renderizarCatalogo(); // Desenha tudo ao carregar
  configurarBusca();    // Ativa a barra de pesquisa
});