import soundScore from "../sounds/excellent.mp3"

export let _soundScore = new Audio(soundScore);

export function openPopup() {
  _soundScore.play();
}