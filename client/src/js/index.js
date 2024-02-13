import Editor from './editor.js';
import './database.js';
import './install.js';
import { Workbox } from 'workbox-window';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>`;
  main.appendChild(spinner);
};

const editor = new Editor();

if (!editor) {
  loadSpinner();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register the service worker
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('Service worker registered successfully');
        // Once the service worker is registered, initialize workbox
        initWorkbox();
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });
  });
} else {
  console.error('Service workers are not supported in this browser.');
}

function initWorkbox() {
  const workboxSW = new Workbox('/service-worker.js');
  workboxSW.register();
}
