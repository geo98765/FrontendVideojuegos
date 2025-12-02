import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localEsMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localEsMx);
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
