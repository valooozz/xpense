import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { bootstrapApplication } from '@angular/platform-browser';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PieController, PointElement, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { App } from './app/app';
import { appConfig } from './app/app.config';

Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PieController, ChartDataLabels, LineController, PointElement, LineElement, BarElement, BarController);

registerLocaleData(localeFr);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
