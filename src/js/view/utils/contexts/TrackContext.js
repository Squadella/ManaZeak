import ContextMenu from '../ContextMenu.js';
'use strict';


class TrackContext extends ContextMenu {


  constructor(options) {
    super(options);

    this._targetId = -1;
    this._commands = {
      playPause: {},
      stop: {},
      download: {},
      queue: {}
    };
  }


  _togglePlay() {
    mzk.changeTrack(this._targetId);
    this.close();
  }


  _stop() {
    mzk.stopPlayback();
    this.close();
  }


  _download() {
    mzk.download(this._targetId);
  }


  _addToQueue(event) {
    event.stopImmediatePropagation();
    mzk.addTrackToQueue(this._targetId);
    this.close();
  }


  setActions(doc) {
    this._commands.playPause = doc.getElementsByClassName('play-pause')[0];
    this._commands.stop = doc.getElementsByClassName('stop')[0];
    this._commands.download = doc.getElementsByClassName('download')[0];
    this._commands.queue = doc.getElementsByClassName('add-to-queue')[0];

    this._commands.playPause.addEventListener('click', this._togglePlay.bind(this), false);
    this._commands.stop.addEventListener('click', this._stop.bind(this), false);
    this._commands.download.addEventListener('click', this._download.bind(this), false);
    this._commands.queue.addEventListener('click', this._addToQueue.bind(this), false);
  }


  open(event, id) {
    this._targetId = id;
    const pos = {
      x: event.clientX,
      y: event.clientY
    };
    // Avoid X overflow : X pos + context width
    if (event.clientX + 135 > document.body.clientWidth) {
      pos.x -= 135;
    }
    // Avoid Y overflow : Y pos + context height + footbar height
    if (event.clientY + (Object.keys(this._commands).length * 30) + 80 > document.body.clientHeight) {
      pos.y -= (Object.keys(this._commands).length * 30);
    }

    this._dom.style.left = `${pos.x}px`;
    this._dom.style.top = `${pos.y}px`;
    this._target.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    if (this._target.contains(this._overlay)) {
      this._targetId = -1;
      this._target.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
    }
  }
}

export default TrackContext;
