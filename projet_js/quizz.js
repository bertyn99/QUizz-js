let quote = {};
fetch("http://localhost:8080/quizz.json")
  .then(result => result.json())
  .then(data => {
    quote = data;
    console.log(data);
  });

let level = "";
function lvl() {
  let choix = document.getElementById("choix");
  let indexlvl = choix.selectedIndex; // Récupération de l'index du <option> choisi

  level = choix.options[indexlvl].value;

  document.getElementById("bof").style.display = "none";
  quizz();
  return level;
}

//

function quizz() {
  let numquestion = 0;

  question(level, numquestion);
  let check = document.getElementById("btnC");
  let back = document.getElementById("btnB");
  if (1 < 5) {
  }
  //bouton qui passe a la question suivante
  check.addEventListener("click", function(e) {
    if (numquestion < 9) {
      console.log(numquestion);
      numquestion++;
      question(level, numquestion);
    } else {
      document.getElementById("pop").style.display = "none";
      document.getElementById("result").style.display = "block";
    }
  });

  //bouton qui revient a la question precedente
  back.addEventListener("click", function(e) {
    if (numquestion <= 10) {
      question(level, numquestion - 1);

      console.log(numquestion);
    } else {
    }
  });
}

function question(niveau, numquestion) {
  document.getElementById("pop").style.display = "block";
  if (niveau.toLowerCase() == "débutant") {
    document.getElementById(`q`).innerHTML =
      quote.quizz.fr[0].débutant[numquestion].question;

    for (let i = 0; i < 4; i++) {
      document.getElementById(`r`)[i + 1].innerHTML =
        quote.quizz.fr[0].débutant[numquestion].propositions[i];
    }
  } else if (niveau.toLowerCase() == "expert") {
    document.getElementById(`q`).innerHTML =
      quote.quizz.fr[0].expert[numquestion].question;

    for (let i = 0; i < 4; i++) {
      document.getElementById(`r`)[i + 1].innerHTML =
        quote.quizz.fr[0].expert[numquestion].propositions[i];
    }
  } else if (niveau.toLowerCase() == "confirmé") {
    document.getElementById(`q`).innerHTML =
      quote.quizz.fr[0].confirmé[numquestion].question;

    for (let i = 0; i < 4; i++) {
      document.getElementById(`r`)[i + 1].innerHTML =
        quote.quizz.fr[0].confirmé[numquestion].propositions[i];
    }
  }
}

function repChoisi(params) {
  //verifie si une reponse a bien  ete choisi
}
