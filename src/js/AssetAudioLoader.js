import { Audio, AudioListener, AudioLoader } from 'three';
import json from '../json/audio.json';

class AssetAudioLoader extends AudioLoader {
  constructor(manager) {
    super(manager);
    this.listener = new AudioListener();
  }

  load() {
    for (const [key, value] of Object.entries(json)) {
      super.load(value.url, function(buffer) {
        var audio = new Audio(this.listener);
        audio.name = key;
        audio.setBuffer(buffer);
        audio.duplicate = this.duplicate.bind(this, audio);

        // Add userData if available
        if (value.userData) {
          audio.userData = value.userData;
          if (audio.userData.loop) audio.setLoop(audio.userData.loop);
          if (audio.userData.volume) audio.setVolume(audio.userData.volume);
        }
        
        // Cache audio asset
        this.manager.cache[key] = audio;
      }.bind(this));
    }
  }

  duplicate(audio) {
    console.warn('AudioLoader: Audio cannot be cloned.')
    return audio;
  }
}

export { AssetAudioLoader };