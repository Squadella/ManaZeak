import FootBar from './footbar/FootBar.js'
import ProgressBar from './modules/ProgressBar.js'

class View {
  constructor() {
    this._init();
  }

  _init() {
    this.footBar = new FootBar();

    this.test();
  }

  changeTrack(isPlaying) {
    this.togglePlay(isPlaying);
    this.footBar.getProgressBar().updateDuration(mzk.model.player.getDuration());
  }

  togglePlay(isPlaying) {
    this.footBar.updatePlayButton(isPlaying);

    if (isPlaying) {
      this.footBar.getProgressBar().activate();
    }

    else if (!isPlaying) {
      this.footBar.getProgressBar().desactivate();
    }
  }

  stopPlayback(hasSource) {
    this.footBar.updatePlayButton(false); // Send !isPlaying to restore play icon
    this.footBar.getProgressBar().resetProgressBar();
    this.footBar.getProgressBar().resetTimecode();
  }

  updateVolume(isMuted, volume) {
    document.getElementById("vo").innerHTML = 'Volume: ' + volume;
    !isMuted ? document.getElementById("mute").innerHTML = 'Mute' : document.getElementById("mute").innerHTML = 'UnMute';
  }

  updateProgress(progress) {
    this.footBar.getProgressBar().setProgress(progress);
    document.getElementById("seak").innerHTML = progress + ' %';
  }

  test() { // This has to go when controls are a thing
    let d, e, f, g, h, i, j, k, l, m, n, o;
    d = document.getElementById("change");
    h = document.getElementById("change1");
    e = document.getElementById("mute");
    i = document.getElementById("vd");
    j = document.getElementById("vu");
    k = document.getElementById("seak");
    l = document.getElementById("rewind");
    m = document.getElementById("ff");
    n = document.getElementById("vh");
    o = document.getElementById("half");

    d.addEventListener('click', function() { mzk.changeTrack(5); });
    h.addEventListener('click', function() { mzk.changeTrack(7); });
    e.addEventListener('click', function() { mzk.toggleMute(); });
    i.addEventListener('click', function() { mzk.adjustVolume(-0.1); });
    j.addEventListener('click', function() { mzk.adjustVolume(0.1); });
    n.addEventListener('click', function() { mzk.setVolume(0.5); });
    l.addEventListener('click', function() { mzk.adjustProgress(-10); });
    m.addEventListener('click', function() { mzk.adjustProgress(10); });
    o.addEventListener('click', function() { mzk.setProgress(50); });

    Notification.info({ message: 'Success UI start' });
  }
}

export default View;
