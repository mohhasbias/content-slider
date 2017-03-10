/* ===========================
 *         definition
 * ===========================*/
// reducer
const LOAD_PLAYLIST = 'LOAD_PLAYLIST';
function playlist(state = [], action) {
  switch(action.type) {
    case LOAD_PLAYLIST:
      return action.payload.playlist;
    default:
      return state;
  }
}

// action
function loadPlaylist(playlist) {
  store.dispatch({
    type: LOAD_PLAYLIST,
    payload: {
      playlist: playlist
    }
  });
}

// select state
function selectPlaylist() {
  return store.getState().playlist;
}

// component
function carousel(playlist) {
  var html = require('yo-yo');

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

// homepage
function homePage() {
  var diffhtml = require('diffhtml');
  var $ = require('jquery');

  // console.log('render homePage');
  store.subscribe(render);
  render();

  fetch('data/playlist.json')
    .then(res => res.json())
    .then(res => loadPlaylist(res));

  function render() {
    diffhtml.innerHTML(document.body, carousel(selectPlaylist()));
    $('.carousel').carousel({
      pause: false
    });
  }
}

// app configure
function configureStore() {
  var redux = require('redux');

  var appReducers = redux.combineReducers({
    playlist: playlist
  });

  return redux.createStore(appReducers);
}

/* ===========================
 *         first load
 * ===========================*/
// global store
var store = configureStore();

// load twitter bootstrap
var css = require('sheetify');
var page = require('page');

require('bootstrap');
css('bootstrap');

// routing
page('/', homePage);
page();