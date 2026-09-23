let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;
let images = [];

for (let i = 0; i < 8; i++) {
  images.push(`https://picsum.photos/id/${imgStart + i}/${dimension}`);
}

let cards = [...images, ...images];

function shuffle(tableau) {
  for (let i = tableau.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
  }
}

let plateau = document.getElementById('game-board');
let affichageCoups = document.getElementById('moves');
let affichageTimer = document.getElementById('timer');
let affichageResultat = document.getElementById('result');
let boutonRejouer = document.getElementById('restart-btn');

let premiereCarte = null;
let deuxiemeCarte = null;
let bloque = false;
let coups = 0;
let pairesTrouvees = 0;

let secondes = 0;
let chrono = null;

function formatTime(sec) {
  let m = String(Math.floor(sec / 60)).padStart(2, '0');
  let s = String(sec % 60).padStart(2, '0');
  return m + ':' + s;
}

function demarrerChrono() {
  clearInterval(chrono);
  chrono = setInterval(function() {
    secondes = secondes + 1;
    affichageTimer.textContent = formatTime(secondes);
  }, 1000);
}

function initGame() {
  plateau.innerHTML = '';
  coups = 0;
  pairesTrouvees = 0;
  premiereCarte = null;
  deuxiemeCarte = null;
  bloque = false;
  secondes = 0;

  affichageCoups.textContent = '0';
  affichageTimer.textContent = '00:00';
  affichageResultat.textContent = '';

  demarrerChrono();
  shuffle(cards);

  cards.forEach(function(url) {
    let carte = document.createElement('div');
    carte.className = 'card';
    carte.dataset.value = url;
    carte.setAttribute('role', 'button');
    carte.setAttribute('tabindex', '0');
    carte.setAttribute('aria-label', 'Carte de jeu');

    carte.addEventListener('click', function() {
      clicCarte(carte);
    });

    plateau.appendChild(carte);
  });
}

function clicCarte(carte) {
  if (bloque == true) return;
  if (carte == premiereCarte) return;
  if (carte.classList.contains('trouve')) return;

  carte.innerHTML = `<img src="${carte.dataset.value}">`;

  if (premiereCarte == null) {
    premiereCarte = carte;
    return;
  }

  deuxiemeCarte = carte;
  bloque = true;
  coups = coups + 1;
  affichageCoups.textContent = coups;

  verifierPaire();
}

function verifierPaire() {
  if (premiereCarte.dataset.value == deuxiemeCarte.dataset.value) {
    premiereCarte.classList.add('trouve');
    deuxiemeCarte.classList.add('trouve');
    pairesTrouvees = pairesTrouvees + 2;

    premiereCarte = null;
    deuxiemeCarte = null;
    bloque = false;

    if (pairesTrouvees == cards.length) {
      clearInterval(chrono);
      affichageResultat.textContent = `Bravo ! Gagné en ${coups} coups et ${formatTime(secondes)} !`;
    }
  } else {
    setTimeout(function() {
      premiereCarte.classList.add('unflip');
      deuxiemeCarte.classList.add('unflip');

      setTimeout(function() {
        premiereCarte.innerHTML = '';
        deuxiemeCarte.innerHTML = '';
        premiereCarte.classList.remove('unflip');
        deuxiemeCarte.classList.remove('unflip');
        premiereCarte = null;
        deuxiemeCarte = null;
        bloque = false;
      }, 400);
    }, 600);
  }
}

boutonRejouer.addEventListener('click', initGame);

initGame();
