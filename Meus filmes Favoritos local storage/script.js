const inputFilme = document.getElementById("filme");
const lista = document.getElementById("lista");
const msgErro = document.getElementById("erro");

let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

function adicionarFilme() {
  try {
    const nome = inputFilme.value.trim();

    if (!nome) throw new Error("O nome do filme não pode estar vazio!");
    if (nome.length < 2) throw new Error("Digite pelo menos 2 caracteres.");
    if (filmes.includes(nome)) throw new Error("Este filme já está na lista!");

    filmes.push(nome);
    salvarFilmes();
    inputFilme.value = "";
    msgErro.textContent = "";
  } catch (erro) {
    msgErro.textContent = erro.message;
  } finally {
    console.log("Tentativa de adicionar filme concluída.");
  }
}

function removerFilme(index) {
  try {
    const confirmar = confirm(`Remover "${filmes[index]}" da lista?`);
    if (!confirmar) return;
    filmes.splice(index, 1);
    salvarFilmes();
  } catch (erro) {
    alert("Erro ao remover: " + erro.message);
  }
}

function limparFilmes() {
  try {
    if (filmes.length === 0) throw new Error("A lista já está vazia!");
    if (!confirm("Tem certeza que deseja apagar todos os filmes?")) return;
    filmes = [];
    salvarFilmes();
  } catch (erro) {
    alert(erro.message);
  }
}

function renderizarFilmes() {
  lista.innerHTML = "";
  if (filmes.length === 0) {
    lista.innerHTML = "<p>Nenhum filme foi adicionado</p>";
    return;
  }

  filmes.forEach((filme, index) => {
    const li = document.createElement("li");
    li.textContent = filme;

    const bntRemover = document.createElement("button");
    bntRemover.textContent = "Remover";
    bntRemover.classList.add("remover");
    bntRemover.onclick = () => removerFilme(index);

    li.appendChild(bntRemover);
    lista.appendChild(li);
  });
}

function salvarFilmes() {
  localStorage.setItem("filmes", JSON.stringify(filmes));
  renderizarFilmes();
}

document.getElementById("adicionar").addEventListener("click", adicionarFilme);
document.getElementById("limpar").addEventListener("click", limparFilmes);

window.onload = renderizarFilmes;
