import CollectionGroup from "../component/CollectionGroup";
import ScrollBar from "../component/bar/ScrollBar";

class Aside {


  constructor() {
    this._dom = {
      container: null,
      collection: null,
      collapser: null,
      controls: null,
      expander: null // We must have a local expander image to add as an absolute to the UI when collapsed
    };

    this._dom.container = document.getElementsByClassName('aside')[0];
    this._dom.collection = document.getElementsByClassName('aside-content')[0];
    this._dom.controls = document.getElementsByClassName('app-controls')[0];
    this._dom.collapser = document.getElementsByClassName('aside-toggle')[0];

    this._dom.expander = document.createElement('DIV');
    this._dom.expander.appendChild(document.createElement('IMG'));
    this._dom.expander.classList.add('aside-expander');
    this._dom.expander.firstChild.src = 'static/img/navigation/nav-left.svg';

    this._isCollapsed = false; // Aside is expanded by default

    this._toggleAside = this._toggleAside.bind(this); // To add/remove event on it

    this._fillCollection();
    this._events();
  }


  _fillCollection() {
    return new Promise(resolve => {
      mzk.komunikator.get('view/mainPage/collection/')
        .then(response => {
          if (response.LIBRARY.length > 0) {
            const libraries = new CollectionGroup({
              label: 'Libraries',
              items: response.LIBRARY
            });
            this._dom.collection.appendChild(libraries.dom);
          }

          if (response.PLAYLISTS.length > 0) {
            const libraries = new CollectionGroup({
              label: 'Playlists',
              items: response.PLAYLIST
            });
          }

          const playbackModes = new CollectionGroup({
            label: 'PlaybackModes'
          });

          this._dom.collection.appendChild(playbackModes.dom);

          new ScrollBar({
            target: this._dom.collection
          });
          this._dom.collection = this._dom.collection.firstElementChild.firstElementChild;
          resolve();
        });
    });
  }


  _events() {
    this._dom.collapser.addEventListener('click', this._toggleAside, false);
  }


  _toggleAside(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this._isCollapsed === true) {
      this._isCollapsed = false;
      document.body.removeChild(this._dom.expander);
      this._dom.expander.removeEventListener('click', this._toggleAside, false);
      requestAnimationFrame(() => { document.querySelector(':root').style.setProperty('--mzk-aside-width', '20%') });
    } else {
      this._isCollapsed = true;
      document.body.appendChild(this._dom.expander);
      this._dom.expander.addEventListener('click', this._toggleAside, false);
      requestAnimationFrame(() => { document.querySelector(':root').style.setProperty('--mzk-aside-width', '0') });
    }
  }


  set enabled(state) {
    this._isAsideAvailable = state;
    if (this._isAsideAvailable === true) {
      this._dom.collapser.style.cursor = 'pointer';
      this._dom.collapser.addEventListener('click', this._toggleAside, false);
    } else {
      this._dom.collapser.style.cursor = 'not-allowed';
      this._dom.collapser.removeEventListener('click', this._toggleAside, false);
    }
  }


}


export default Aside;
