import Modal from '../component/overlay/Modal.js';
'use strict';


class TapBpmModal extends Modal {


  constructor(options) {
    super(options);

    this._trackId = options.trackId;
    this._bpmClickContainer = null;
    this._bpm = null;
    this._count = 0;
    // Timestamps
    this._ts = {
        current: 0,
        previous: 0,
        first: 0
    };
  }


  setActions(doc) {
    const closeTop = doc.getElementById('tap-bpm-header-close');
    const resetBottom = doc.getElementById('tap-bpm-reset');
    const sendBottom = doc.getElementById('tap-bpm-send');
    const trackTitle = doc.getElementById('tap-bpm-track-title');
    const trackArtist = doc.getElementById('tap-bpm-track-artist');
    const trackBpm = doc.getElementById('tap-bpm-track-bpm');

    this._bpmClickContainer = doc.getElementsByClassName('tap-bpm-click-container')[0];
    this._bpm = doc.getElementsByClassName('tap-bpm-value')[0];

    closeTop.addEventListener('click', this.close.bind(this));
    resetBottom.addEventListener('click', this._resetBpm.bind(this));
    sendBottom.addEventListener('click', this._sendBpm.bind(this));
    this._bpmClickContainer.addEventListener('click', this._tap.bind(this));

    mzk.komunikator.get(`track/getBpm/${mzk.ui.getTrackById(this._trackId).id}/`)
      .then(response => {
        trackBpm.innerHTML = response.TRACK_BPM;
        if (response.TRACK_BPM === null) {
          trackBpm.innerHTML = mzk.lang.tags.notSet;
        }

        trackTitle.innerHTML = response.TRACK_TITLE;
        trackArtist.innerHTML = response.TRACK_ARTIST;
      })
      .catch(err => {
        console.error(err);
      });
  }


  _tap() {
    this._ts.current = Date.now();
    // Store the first timestamp of the tap sequence on first click
    if (this._ts.first === 0) {
        this._ts.first = this._ts.current;
    }

    if (this._ts.previous !== 0) {
    const bpm = 60000 * this._count / (this._ts.current - this._ts.first);
      if (bpm % 1 > 0.5) {
        this._bpm.innerHTML = Math.ceil(bpm);
      } else {
        this._bpm.innerHTML = Math.round(bpm);
      }
    }

    // Store the old timestamp
    this._ts.previous = this._ts.current;
    ++this._count;

    this._bpmClickContainer.style.border = 'dashed 3px #F74B46'; // Color is mzk-color-anti-primary-dark
    setTimeout(() => {
      this._bpmClickContainer.style.border = 'dashed 3px #0F1015'; // Default color is pzk-color-bg-dark
    }, 100);
  }


  _resetBpm() {
    this._count = 0;
    this._ts.current = 0;
    this._ts.previous = 0;
    this._ts.first = 0;
    this._bpm.innerHTML = '0';
    this._bpmClickContainer.style.border = 'dashed 3px #0F1015';
  }


  _sendBpm() {
    const options = {
      TRACK_ID: mzk.ui.getTrackById(this._trackId).id,
      BPM: this._bpm.innerHTML
    };

    mzk.komunikator.post('track/setBpm/', options)
      .then(this.close.bind(this))
      .catch(err => {
        console.error(err);
        this.close();
      });
  }


}

export default TapBpmModal;