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

shuffle(cards);
console.log(cards);