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

let premiereCarte = null;
let deuxiemeCarte = null;
let bloque = false;
let coups = 0;
let pairesTrouvees = 0;

function initGame() {
  shuffle(cards);

  cards.forEach(function(url) {
    let carte = document.createElement('div');
    carte.className = 'card';
    carte.dataset.value = url;
    carte.setAttribute('role', 'button');
    carte.setAttribute('tabindex', '0');

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
  } else {
    setTimeout(function() {
      premiereCarte.innerHTML = '';
      deuxiemeCarte.innerHTML = '';
      premiereCarte = null;
      deuxiemeCarte = null;
      bloque = false;
    }, 800);
  }
}

initGame();