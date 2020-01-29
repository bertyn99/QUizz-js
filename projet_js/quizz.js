//initalisation de variable
let quote = {}; // variable qui va contenir la data hors du fetch
let level = ""; //level de difficulté
let repChoisi;
let choice;
let score = 0; // score au quizz initialisée a zérolet btntheme = document.getElementsByClassName('theme');
let btntheme = document.getElementsByClassName("theme"); // button de chaque theme
let theme; // theme du quizz
let sec = 11;
let timer = "";
for (let i = 0; i < btntheme.length; i++) {
  btntheme[i].addEventListener("click", function(e) {
    // ajout d'onclick sur les bouton "Try it "des themes
    theme = e.target.value;
    fetch(`http://localhost:8080/db/quizz${theme}.json`)
      .then(result => result.json())
      .then(data => {
        quote = data;
        console.log(quote);
        document.getElementById("theme").style.display = "none";
        document.getElementById("quizz").style.display = "block";
      });
  });
}

let back = document.getElementById("btnB"); //button de retour

function lvl() {
  let choixLevel = document.getElementById("choix");
  let indexlvl = choixLevel.selectedIndex; // Récupération de l'index du <option> choisi

  level = choixLevel.options[indexlvl].value;

  document.getElementById("bof").style.display = "none";
  quizz();
  return level;
}

function quizz() {
  let numquestion = 0;

  question(level, numquestion);

  let suivant = document.getElementById("btnS");
  //bouton qui passe a la question suivante
  suivant.addEventListener("click", function(e) {
    if (numquestion < 9) {
      console.log(numquestion);
      numquestion++;
      question(level, numquestion);
    } else {
      document.getElementById("pop").style.display = "none";
      document.getElementById("result").style.display = "block";
      document.getElementById("result").innerHTML = `<h1> ${quote.thème}</h1>
      <p>Vous avez  obtenu un score de ${score}/10 </p>`;
    }
  });

  //bouton qui revient a la question precedente
  back.addEventListener("click", function(e) {
    if (numquestion < 10 && numquestion > 0) {
      console.log(numquestion);
      question(level, numquestion - 1);
    } else if (numquestion == 10) {
    }
  });
}

function Timer() {
  sec--;
  if (sec >= 0) {
    document.getElementById(`timer`).innerHTML = "0:" + sec;

    let check = document.getElementById("btnC");
    //bouton qui check les reponse
    check.addEventListener("click", function(e) {
      verifRep(numquestion, level);
    });
  } else {
    clearInterval(timer);
  }

  console.log(sec);
}

function question(niveau, numquestion) {
  document.getElementById("pop").style.display = "block";
  timer = setInterval("Timer()", 1000);
  if (numquestion < 1) {
    back.style.display = "none";
  } else {
    back.style.display = "block";
  }
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

function verifRep(num, level) {
  let choixLevel = document.getElementById("r");
  let indexlvl = choixLevel.selectedIndex; // Récupération de l'index du <option> choisi

  repChoisi = choixLevel.options[indexlvl].value;
  //verifie si une reponse a bien  ete choisi
  if (level.toLowerCase() == "débutant") {
    if (repChoisi == quote.quizz.fr[0].débutant[num].réponse) {
      console.log("bonne reponse");
      alert("bonne reponse");
      score++;
    } else {
      console.log("mauvaise reponse");
    }
  } else if (level.toLowerCase() == "expert") {
    if (repChoisi == quote.quizz.fr[0].expert[num].réponse) {
      console.log("bonne reponse");
      alert("bonne reponse");
      score++;
    } else {
      console.log("mauvaise reponse");
    }
  } else if (level.toLowerCase() == "confirmé") {
    if (repChoisi == quote.quizz.fr[0].confirmé[num].réponse) {
      console.log("bonne reponse");
      alert("bonne reponse");
      score++;
    } else {
      console.log("mauvaise reponse");
    }
  }
}
