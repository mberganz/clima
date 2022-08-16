document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();
  clearInfo();

  let input = document.querySelector("#searchInput").value();

  if (input != "") {
    showWarning("Carregando...");

    let url = `https://api.openweathermap.org/data/2.5/weather?=${encodeURI(
      input
    )}&appid=bd9d8015509aaa28777d5541cc90a35c&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        climaIcon: json.weather[0].icon,
        climaTexto: json.weather[0].description,
        windSpeed: json.wind.speed,
        windAngle: json.wind.degree,
      });
    } else {
      showWarning("Não encontramos esta localização!");
    }
  }
});

function showWarning() {
  document.querySelector(".aviso").innerHTML = msg;
}

function clearInfo() {
  showWarning("");

  document.querySelector(".resultado").style.display = "nome";
}

function showInfo(dados) {
  showWarning("");

  document.querySelector(
    ".titulo"
  ).innerHTML = `${dados.name}, ${dados.country}`;
  document.querySelector(".tempInfo").innerHTML = `${dados.temp} <sup>°C</sup>`;
}
