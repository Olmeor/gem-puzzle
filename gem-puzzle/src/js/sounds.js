import { _soundInput } from "./resize"
import { _soundStart } from "./shuffle"
import { _soundShift, _soundWin } from "./shift"
import { _soundScore } from "./popup"
import { _soundSave } from "./save"

export function muteAudio() {
  const soundButton = document.querySelector('.sound-button');
  if (!soundButton.classList.contains('sound-button_mute')) {
    soundButton.classList.add('sound-button_mute');
    _soundInput.muted = true;
    _soundStart.muted = true;
    _soundShift.muted = true;
    _soundWin.muted = true;
    _soundScore.muted = true;
    _soundSave.muted = true;
  } else {
    soundButton.classList.remove('sound-button_mute');
    _soundInput.muted = false;
    _soundStart.muted = false;
    _soundShift.muted = false;
    _soundWin.muted = false;
    _soundScore.muted = false;
    _soundSave.muted = false;
  }
}

