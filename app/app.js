/* ===========================
 *         imports
 * ===========================*/
var html = require('yo-yo');
var css = require('sheetify');
var diffhtml = require('diffhtml');
var redux = require('redux');
var $ = require('jquery');
require('bootstrap');

/* ===========================
 *         definition
 * ===========================*/
const LOAD_PLAYLIST = 'LOAD_PLAYLIST';
function playlist(state = [], action) {
  switch(action.type) {
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
    <div class="carousel slide">
      <div class="carousel-inner">
        ${
          playlist.map( (item, index) => html`
            <div class="item ${index === 0? 'active' : ''}">
              <img src="${item.url}" alt="image-${index}" style="margin: auto;">
            </div>
          `)
        }
      </div>
    </div>
  `;
}

function homePage() {
  diffhtml.innerHTML(document.body, carousel(selectPlaylist()));
  $('.carousel').carousel({
    pause: false
  });
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
  homePage();
});

fetch('data/playlist.json')
  .then(res => res.json())
  .then(res => loadPlaylist(res));