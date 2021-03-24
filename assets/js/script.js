// report.html
const submit = document.querySelector(".submit");
const reset = document.querySelector(".reset");

submit.addEventListener("click", function () {
  if (document.querySelector("#date").value === "" || document.querySelector("#number").value === "") {
    return null;
  } else {
    const history = {
      date: document.querySelector("#date").value,
      select: document.querySelector("#select").value,
      number: document.querySelector("#number").value,
      note: document.querySelector("#note").value,
    };

    putHistory(history);

    inputHistory();
  }
});

reset.addEventListener("click", function () {
  clearHistory();
});

const CACHE_KEY = "track";

function checkForStorage() {
  return typeof Storage !== "undefined";
}

function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    historyData.push(data);

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

function showHistory() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY));
  } else {
    return [];
  }
}

function inputHistory() {
  const datas = showHistory();
  let historyTable = document.querySelector("#history-table");
  historyTable.innerHTML = "";

  for (let data of datas) {
    let row = document.createElement("tr");
    row.innerHTML = '<th scope="row">' + data.date + "</th>";

    if (data.select == "income") {
      row.innerHTML += "<td>" + data.number + "</td>";
      row.innerHTML += "<td>-</td>";
    } else {
      row.innerHTML += "<td>-</td>";
      row.innerHTML += "<td>" + data.number + "</td>";
    }
    row.innerHTML += "<td>" + data.note + "</td>";

    historyTable.appendChild(row);
  }
}

inputHistory();

function clearHistory() {
  let historyTable = document.querySelector("#history-table");
  historyTable.innerHTML = "";
  localStorage.removeItem(CACHE_KEY);
}
