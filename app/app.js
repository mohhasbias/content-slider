/* ===========================
 *         imports
 * ===========================*/
var html = require('yo-yo');
var css = require('sheetify');
var diffhtml = require('diffhtml');
var redux = require('redux');

/* ===========================
 *         definition
 * ===========================*/
const FETCH_PLAYLIST = 'FETCH_PLAYLIST';
const LOAD_PLAYLIST = 'LOAD_PLAYLIST';
function playlist(state = [], action) {
  // return state;

  switch(action.type) {
    case FETCH_PLAYLIST:
      return 'FETCH_PLAYLIST';
    case LOAD_PLAYLIST:
      return action.payload.playlist;
    default:
      return state;
  }
}

function loadPlaylist(playlist) {
  store.dispatch({
    type: LOAD_PLAYLIST,
    payload: {
      playlist: playlist
    }
  });
}

function selectPlaylist() {
  return store.getState().playlist;
}

function carousel(playlist) {
  return html`
    <ul class="list-group">
      ${
        playlist.map( (item, index) => html`
          <li class="list-item">
            <img src="${item.url}" alt="image-${index}" height="300">
          </li>
        `)
      }
    </ul>
  `;
}

/* ===========================
 *         first load
 * ===========================*/
css('bootstrap');

var appReducers = redux.combineReducers({
  playlist: playlist
});

var store = redux.createStore(appReducers);

store.subscribe( () => {
  diffhtml.innerHTML(document.body, carousel(selectPlaylist()));
});

fetch('data/playlist.json')
  .then(res => res.json())
  .then(res => loadPlaylist(res));