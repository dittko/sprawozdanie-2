import { AppComponent } from './app/app';
import { config } from './app/app.config.server';
import { bootstrapApplication } from '@angular/platform-browser';

export default function() {
  return bootstrapApplication(AppComponent, config);
}