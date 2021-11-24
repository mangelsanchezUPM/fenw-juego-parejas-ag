import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from 'src/app/shared/models/record.model';

@Component({
  selector: 'app-records-chart',
  templateUrl: './records-chart.component.html',
  styleUrls: ['./records-chart.component.css'],
})
export class RecordsChartComponent {
  private RANKING_IMAGES_PATH: string = '../../../../../assets/ranking-position/';
  private EXTENSION: string = '.png';

  @Input() records$: Observable<Record[]> = new Observable();
  
  getImage(index: number) {
    const position: number = index + 1;
    return this.RANKING_IMAGES_PATH + position + this.EXTENSION;
  }
}
