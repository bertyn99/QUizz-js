//initalisation de variable
let quote = {}; // variable qui va contenir la data hors du fetch
let level = ""; //level de difficulté
let repChoisi;
let choice;
let numquestion = 0;
let score = 0; // score au quizz initialisée a zérolet btntheme = document.getElementsByClassName('theme');
let btntheme = document.getElementsByClassName("theme"); // button de chaque theme
let theme; // theme du quizz
let sec = 20;// temps en second
let timer = "";

localStorage.setItem("highscore", `{ "nom": "bertyn", "score": 1 }`)//idéé sauvegardes des score sous forme de JSON string dans local storage
let data = localStorage.getItem("highscore")//qui sont recup ici
const test = JSON.parse(data)//puis parse pr recup la data
for (let i = 0; i < btntheme.length; i++) {
  btntheme[i].addEventListener("click", function (e) {
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

  console.log(test)
  question(level, numquestion);

  let suivant = document.getElementById("btnS");
  //bouton qui passe a la question suivante
  suivant.addEventListener("click", function (e) {
    if (numquestion < 9 && (sec >= 0 || sec < 0)) {
      clearInterval(timer);
      sec = 20
      numquestion++;
      question(level, numquestion);
    } else {
      clearInterval(timer);
      document.getElementById("pop").style.display = "none";
      document.getElementById("score").innerHTML = `<h1> ${quote.thème}</h1>
      <p>Vous avez  obtenu un score de ${score}/10 </p>
      `;

      if (score > localStorage.getItem("highscore").score) {//test pour voir si il recupere et compare bien avec le score en local storage

        console.log("test")
      }
    }
  });

  //bouton qui revient a la question precedente
  back.addEventListener("click", function (e) {
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
    check.addEventListener("click", function (e) {
      verifRep(numquestion, level);
      clearInterval(timer);
    });
  } else {
    clearInterval(timer);
    verifRep(numquestion, level)
    //Censer ouvrir le modal sans avoir appuyer sur le bouton check

  }

  console.log(sec);
}

function question(niveau, numquestion) {
  document.getElementById("pop").style.display = "block";//block des question
  progressBar(numquestion)// incrementation du widht de la progress bar
  timer = setInterval("Timer()", 1000);//lancement du time a l'initialisation de la question
  if (numquestion < 1) { //if le num de la question est inf a 1 impossible d'affiche le bouton retour
    back.style.display = "none";
  } else {
    back.style.display = "inline-block";
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
  document.getElementById('result').style.display = "block"
  if (level.toLowerCase() == "débutant") {
    if (repChoisi == quote.quizz.fr[0].débutant[num].réponse) {

      document.getElementById('result').innerHTML = ` <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Bonne reponse</h4>
      <p> ${quote.quizz.fr[0].débutant[num].réponse}</p>
      <hr>
      <p id="anecdote" class="mb-0">${quote.quizz.fr[0].débutant[num].anecdote}</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
  </div>
`

      score++;
    } else {
      console.log("mauvaise reponse");
      document.getElementById('result').innerHTML = ` <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">Mauvaise reponse</h4>
      <p> La bonne reponse est ${quote.quizz.fr[0].débutant[num].réponse}</p>
      <hr>
      <p id="anecdote" class="mb-0">${quote.quizz.fr[0].débutant[num].anecdote}</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
  </div>
`
    }
  } else if (level.toLowerCase() == "expert") {
    if (repChoisi == quote.quizz.fr[0].expert[num].réponse) {
      document.getElementById('result').innerHTML = ` <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Bonne reponse</h4>
      <p> ${quote.quizz.fr[0].expert[num].réponse}</p>
      <hr>
      <p id="anecdote" class="mb-0">${quote.quizz.fr[0].débutant[num].anecdote}</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
  </div>
`
      score++;
    } else {
      console.log("mauvaise reponse");
      document.getElementById('result').innerHTML = ` <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">Mauvaise reponse</h4>
      <p> La bonne reponse est  ${quote.quizz.fr[0].expert[num].réponse}</p>
      <hr>
      <p id="anecdote" class="mb-0">${quote.quizz.fr[0].expert[num].anecdote}</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
  </div>
`
    }
  } else if (level.toLowerCase() == "confirmé") {
    if (repChoisi == quote.quizz.fr[0].confirmé[num].réponse) {
      document.getElementById('result').innerHTML = ` <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Bonne reponse</h4>
      <p> ${quote.quizz.fr[0].confirmé[num].réponse}</p>
      <hr>
      <p id="anecdote" class="mb-0">${quote.quizz.fr[0].confirmé[num].anecdote}</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
  </div>
`
      score++;
    } else {
      console.log("mauvaise reponse");
      document.getElementById('result').innerHTML = ` <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">Mauvaise reponse</h4>
      <p> La bonne reponse est  ${quote.quizz.fr[0].confirmé[num].réponse}</p>
      <hr>
      <p id="anecdote" class="mb-0">${quote.quizz.fr[0].confirmé[num].anecdote}</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
  </div>
`
    }
  }
}

function progressBar(num) {// bar de progression qui previent du niveau de completion du quizz
  document.getElementsByClassName(`progress-bar-striped`)[0].style.width = `${num}0%`
}

function TriScore() {
  //fonction qui a pr but du trier l'array des score d'un themeet d'une diffculté
  // afin de range les objet Playerscore  par odre croissant
}