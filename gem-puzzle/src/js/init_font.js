import { countSide } from "./index";

export function initFont () {
  let diceAmount = countSide ** 2;
  const wrapper = document.querySelector('.wrapper');
  const diceNodes = document.querySelectorAll(".dice");

  if (innerWidth >= 768 && diceAmount > 36) {
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '2rem'
    }
  } else if (innerWidth >= 768 && diceAmount < 25) {
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '4rem'
    }
  } else if (innerWidth >= 768 && diceAmount >= 25 && diceAmount <= 36) {
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '3rem'
    }
  } else if (innerWidth > 400 && innerWidth < 768 && diceAmount > 36) {
    wrapper.style.padding = '2rem 10vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '1rem'
    }
  } else if (innerWidth > 400 && innerWidth < 768 && diceAmount < 25) {
    wrapper.style.padding = '2rem 10vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '3rem'
    }
  } else if (innerWidth > 400 && innerWidth < 768 && diceAmount >= 25 && diceAmount <= 36) {
    wrapper.style.padding = '2rem 10vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '2rem'
    }
  } else if (innerWidth <= 400 && diceAmount > 36) {
    wrapper.style.padding = '2rem 5vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '1rem'
    }
  } else if (innerWidth <= 400 && diceAmount < 25) {
    wrapper.style.padding = '2rem 5vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '2rem'
    }
  } else if (innerWidth <= 400 && diceAmount >= 25 && diceAmount <= 36) {
    wrapper.style.padding = '2rem 5vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '1.5rem'
    }
  }
}