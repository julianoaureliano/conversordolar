let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");
let botao = document.querySelector("#botao");

async function obterCotacao() {
  try {
    // A API abaixo é uma que achei ai na net
    const resposta = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const dados = await resposta.json();
    dolar = dados.rates.BRL; // Atualiza o valor do dólar com o valor real
    console.log("Nova cotação do dólar: ", dolar); // Verifique a cotação no console
  } catch (erro) {
    console.error("Erro ao obter a cotação:", erro);
  }
}
let dolar = 6.5;
obterCotacao();

botao.addEventListener("click", () => {
  alert("Tem nada aqui não :) ");
});
usdInput.addEventListener("keyup", () => {
  convert("usd-to-brl");
});

brlInput.addEventListener("keyup", () => {
  convert("brl-to-usd");
});
//formatar os valores quando o mouse nao esta mais no foco
usdInput.addEventListener("blur", () => {
  usdInput.value = formatCurrency(usdInput.value);
});
//formatar os valores quando o mouse nao esta mais no foco
brlInput.addEventListener("blur", () => {
  brlInput.value = formatCurrency(brlInput.value);
});

usdInput.value = "1000,00";
convert("usd-to-brl");

function formatCurrency(value) {
  //ajustar o valor
  let fixedValue = fixValue(value);
  let options = {
    userGrouping: false,
    minimumFractionDigits: 2,
  };

  //utilizar a faunçao formatar
  let formatter = new Intl.NumberFormat("pt-BR", options);

  //retorna valor formatado
  return formatter.format(fixedValue);
}

function fixValue(value) {
  let fixedValue = value.replace(",", "."); //.replace= função do javascrpit que substitue algo por outro
  let floatValue = parseFloat(fixedValue);
  if (floatValue == NaN) {
    floatValue = 0;
  }
  return floatValue;
}
function convert(type) {
  if (type == "usd-to-brl") {
    let fixedValue = fixValue(usdInput.value);
    let result = fixedValue * dolar;
    result = result.toFixed(2);
    brlInput.value = formatCurrency(result);
    //converter o valor
    //mostra no campo de real
  }

  if (type == "brl-to-usd") {
    //ajustar o valor trocar a virgula pelo ponto
    //converter o valor
    //mostra no campo de usd
    let fixedValue = fixValue(brlInput.value);
    let result = fixedValue / dolar;
    result = result.toFixed(2);
    usdInput.value = formatCurrency(result);
  }
}
