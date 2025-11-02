// 1. ATUALIZE O ARRAY DE DADOS
const data = [
  {
    title: "Unidade Evangelion 01",
    imgSrc: "images/eva0101 1.png",
    alt: "eva01"
  },
  {
    title: "Unidade Evangelion 02",
    imgSrc: "images/eva0202 1.png",
    alt: "eva02"
  }
];

// 2. ATUALIZE OS SELETORES
// Pegamos os elementos corretos do seu novo HTML
const cardContainer = document.querySelector(".card-wrapper");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button"); // Novo seletor para o botão

// 3. ATUALIZE A FUNÇÃO DE EXIBIÇÃO
// A lógica é a mesma, mas o HTML dentro do loop (template string) é atualizado
// para bater com a sua nova estrutura de "card-item"
const displayData = (items) => {
  cardContainer.innerHTML = ""; // Limpa os cards estáticos (como no seu exemplo original)
  items.forEach(e => {
    cardContainer.innerHTML += `
      <div class="card-item"> 
        <img src="${e.imgSrc}" alt="${e.alt}">
        <div class="card-content">
          <h3>${e.title}</h3>
          <button type="button">EU QUERO ESSE!</button>
        </div>
      </div>
    `;
  });
};

// 4. CRIAR UMA FUNÇÃO DE BUSCA REUTILIZÁVEL
function performSearch() {
  const searchTerm = searchInput.value.toLocaleLowerCase();
  
  // A lógica de filtro é a mesma: procura no 'title'
  const searchResult = data.filter(i => 
    i.title.toLocaleLowerCase().includes(searchTerm)
  );
  
  // Exibe apenas os resultados filtrados
  displayData(searchResult);
}

// Filtra também ao clicar no botão "Pesquisar"
searchButton.addEventListener("click", performSearch);

// Exibe todos os dados quando a página carrega pela primeira vez
window.addEventListener("load", () => {
  displayData(data);
});