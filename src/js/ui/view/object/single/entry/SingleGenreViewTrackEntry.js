import TrackEntry from "../../../../component/entry/TrackEntry";
'use strict';


class SingleGenreViewTrackEntry extends TrackEntry {


  constructor(options) {
    super({
      datasetId: options.trackNumber - 1
    });

    this._id = options.track.id;
    this._track = options.track;
    this._trackNumber = options.trackNumber;

    this._init();
  }


  destroy() {
    super.destroy();
  }


  _init() {
    const duration = document.createElement('P');
    duration.innerHTML = Utils.secondsToTimecode(this._track.duration);

    const title = document.createElement('P');
    title.innerHTML = this._track.title;

    const artist = document.createElement('P');
    artist.innerHTML = this._track.artists;

    this._dom.container.appendChild(title);
    this._dom.container.appendChild(artist);
    this._dom.container.appendChild(duration);
  }


  get id() {
    return this._id;
  }


}


export default SingleGenreViewTrackEntry;