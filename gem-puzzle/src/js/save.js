import soundSave from "../sounds/save.mp3"

export let _soundSave = new Audio(soundSave);

export function save() {
  _soundSave.play();
}