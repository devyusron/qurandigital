import './app.css'
// @ts-ignore
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service worker registered: ', registration);
      })
      .catch(registrationError => {
        console.error('Service worker registration failed: ', registrationError);
      });
  });
}

export default app
