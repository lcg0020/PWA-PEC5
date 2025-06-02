import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('assets/service-worker.js')
    .then(() => console.log('✅ Service Worker registrado'))
    .catch(err => console.error('❌ Error al registrar el Service Worker', err));
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
