import { Component, OnInit } from '@angular/core';

import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'toDo';

  ngOnInit(): void {
    Chart.register(ChartDataLabels);
  }

}
