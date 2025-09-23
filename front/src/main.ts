import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PieController, PointElement, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { provideToastr } from 'ngx-toastr';
import { App } from './app/app';
import { appConfig } from './app/app.config';

Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PieController, ChartDataLabels, LineController, PointElement, LineElement, BarElement, BarController);

registerLocaleData(localeFr);

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    provideToastr(),
  ]
})
  .catch((err) => console.error(err));
