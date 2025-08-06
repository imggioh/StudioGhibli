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
