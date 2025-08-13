document.getElementById("buscar").addEventListener("click", () => {
  const nome = document.getElementById("filme").value.toLowerCase().trim();
  const resultado = document.getElementById("resultado");

  if (!nome) {
    resultado.innerHTML = "Digite o nome de um filme.";
    return;
  }

  resultado.innerHTML = "Buscando...";

  fetch('https://ghibliapi.vercel.app/films')
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro ao buscar os filmes.");
      }
      return res.json();
    })
    .then(filmes => {
      const filmeEncontrado = filmes.find(filme => filme.title.toLowerCase() === nome);

      if (!filmeEncontrado) {
        resultado.innerHTML = "Filme não encontrado.";
        return;
      }

      resultado.innerHTML = `
        <div class="card-filme">
          <h2>${filmeEncontrado.title}</h2>
          <p><strong>Diretor:</strong> ${filmeEncontrado.director}</p>
          <p><strong>Ano de Lançamento:</strong> ${filmeEncontrado.release_date}</p>
          <p><strong>Descrição:</strong> ${filmeEncontrado.description}</p>
        </div>
      `;
    })
    .catch(error => {
      resultado.innerHTML = "Erro: " + error.message;
    });
});

function mudarTema(tema) {
  document.body.className = tema;
  localStorage.setItem("temaSalvo", tema);
}

window.onload = function() {
  let tema = localStorage.getItem("temaSalvo");
  if (tema) {
    document.body.className = tema;
  }
};

const btnTema = document.getElementById("btnTema");
const opcoesTema = document.getElementById("opcoesTema");

btnTema.addEventListener("click", function() {
  opcoesTema.classList.toggle("oculto");
  btnTema.textContent = opcoesTema.classList.contains("oculto") ? "Tema ▾" : "Tema ▲";
});

document.addEventListener("click", function(event) {
  const menu = document.querySelector(".menu-tema");
  if (!menu.contains(event.target)) {
    opcoesTema.classList.add("oculto");
    btnTema.textContent = "Tema ▾";
  }
});
