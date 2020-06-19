import SingleTagView from "../SingleTagView";
import ScrollBar from "../../../../component/bar/ScrollBar";
'use strict';


class SingleProducerView extends SingleTagView {


  constructor(options) {
    super({
      type: 'producer'
    });

    this._id = options.id;

    this._dom = {
      cover: null,
      title: null,
      trackCompo: null,
      artistLabel: null,
      country: null,
      play: null,
      albumContainer: null
    };

    this._init()
      .then(this._processArtist.bind(this))
      .then(this._setupContext.bind(this))
      .then(this._viewReady);
  }


  destroy() {
    super.destroy();
  }


  _processArtist(response) {
    return new Promise(resolve => {
      this._dom.play = this._dom.wrapper.getElementsByClassName('play-album')[0];
      this._dom.cover = this._dom.wrapper.getElementsByClassName('artist-pp')[0];
      this._dom.title = this._dom.wrapper.getElementsByClassName('artist-title')[0];
      this._dom.artistLabel = this._dom.wrapper.getElementsByClassName('artist-labels')[0];
      this._dom.yearLabel = this._dom.wrapper.getElementsByClassName('artist-years')[0];
      this._dom.trackCompo = this._dom.wrapper.getElementsByClassName('artist-track-composition')[0];
      this._dom.country = this._dom.wrapper.getElementsByClassName('artist-country')[0];
      this._dom.genres = this._dom.wrapper.getElementsByClassName('artist-genres')[0];
      this._dom.albumContainer = this._dom.wrapper.getElementsByClassName('sp-artist-albums')[0];

      if (response.ARTIST.PP !== null && Utils.imageUrlExists(response.ARTIST.PP) === true) {
        this._dom.cover.src = response.ARTIST.PP;
      }

      this._dom.title.innerHTML = response.ARTIST.NAME;
      this._dom.artistLabel.innerHTML = response.ARTIST.ALBUM_ARTIST;
      this._dom.yearLabel.innerHTML = `<i>${response.ARTIST.ALBUMS[0].YEAR} – ${response.ARTIST.ALBUMS[response.ARTIST.ALBUMS.length -1].YEAR}</i>`;
      this._dom.trackCompo.innerHTML = `${response.ARTIST.TOTAL_RELEASED_ALBUM} ${mzk.lang.playlist.albums} – ${response.ARTIST.TOTAL_RELEASED_TRACK} ${mzk.lang.playlist.tracks} – ${response.ARTIST.DURATION}`;
      this._dom.country.innerHTML = response.ARTIST.COUNTRY;
      this._dom.genres.innerHTML = response.ARTIST.GENRES;

      for (let i = 0; i < response.ARTIST.ALBUMS.length; ++i) {
        const album = document.createElement('DIV');
        album.classList.add('sp-artist-album');
        album.dataset.id = response.ARTIST.ALBUMS[i].ALBUM_ID;

        const albumTitle = document.createElement('P');
        albumTitle.innerHTML = response.ARTIST.ALBUMS[i].ALBUM_TITLE;

        const albumCover = document.createElement('IMG');
        albumCover.src = response.ARTIST.ALBUMS[i].ALBUM_COVER;

        const albumYear = document.createElement('P');
        albumYear.innerHTML = response.ARTIST.ALBUMS[i].ALBUM_YEAR;

        album.addEventListener('click', () => {
          mzk.ui.setSceneView({
            name: 'SingleAlbum',
            uiName: response.ARTIST.ALBUMS[i].ALBUM_TITLE,
            id: response.ARTIST.ALBUMS[i].ALBUM_ID
          });
        }, false);

        album.appendChild(albumTitle);
        album.appendChild(albumCover);
        album.appendChild(albumYear);
        this._dom.albumContainer.appendChild(album);
      }

      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleProducerView;