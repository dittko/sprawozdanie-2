import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const config = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
