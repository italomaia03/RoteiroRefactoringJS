const { readFileSync } = require("fs");

var Repositorio = require("./repositorio.js");
var ServicoCalculoFatura = require("./servico.js");
var gerarFaturaStr = require("./apresentacao.js");

const faturas = JSON.parse(readFileSync("./faturas.json"));

const calc = new ServicoCalculoFatura(new Repositorio());
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
