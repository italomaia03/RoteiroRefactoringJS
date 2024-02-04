const { readFileSync } = require("fs");

class ServicoCalculoFatura {
  constructor(repo) {
    this.repo = repo;
  }
  calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.repo.getPeca(apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }
  calcularTotalCreditos(apresentacoes) {
    return apresentacoes.reduce(
      (acumulador, valorAtual) => acumulador + this.calcularCredito(valorAtual),
      0
    );
  }
  calcularTotalApresentacao(apre) {
    let total = 0;
    switch (this.repo.getPeca(apre).tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Peça desconhecia: ${this.repo.getPeca(apre).tipo}`);
    }
    return total;
  }
  calcularTotalFatura(apresentacoes) {
    return apresentacoes.reduce(
      (acumulador, valorAtual) =>
        acumulador + this.calcularTotalApresentacao(valorAtual),
      0
    );
  }
}

class Repository {
  constructor() {
    this.pecas = JSON.parse(readFileSync("./pecas.json"));
  }

  getPeca(apre) {
    return this.pecas[apre.id];
  }
}
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(valor / 100);
}

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(
      calc.calcularTotalApresentacao(apre)
    )}\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(
    calc.calcularTotalFatura(fatura.apresentacoes)
  )}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(
    fatura.apresentacoes
  )} \n`;
  return faturaStr;
}

const faturas = JSON.parse(readFileSync("./faturas.json"));

const calc = new ServicoCalculoFatura(new Repository());
const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);
/* console.log(faturaHtml);
const faturaHtml = gerarFaturaHtml(faturas, pecas);
function gerarFaturaHtml(fatura, pecas) {
  let faturaStr = `<html>
<p> Fatura ${fatura.cliente} </p>
<ul>\n`;

  for (let apre of fatura.apresentacoes) {
    faturaStr += `<li>  ${getPeca(pecas, apre)}: ${formatarMoeda(
      calcularTotalApresentacao(pecas, apre)
    )} (${apre.audiencia} assentos)</li>\n`;
  }
  faturaStr += `</ul>
<p>  Valor Total: ${formatarMoeda(
    calcularTotalFatura(pecas, fatura.apresentacoes)
  )} </p>\n`;
  faturaStr += `<p>  Créditos acumulados: ${calcularTotalCreditos(
    pecas,
    fatura.apresentacoes
  )} </p>
</html>`;
  return faturaStr;
} */
