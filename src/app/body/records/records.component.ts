import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from 'src/app/shared/models/record.model';
import { RestClientService } from 'src/app/shared/services/rest-client.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  private RANKING_IMAGES_PATH: string = '../../../../assets/ranking-position/';
  private EXTENSION: string = '.png';

  globalRecords$: Observable<Record[]> = new Observable();
  
  constructor(private restService: RestClientService) {}

  ngOnInit(): void {
    this.globalRecords$ = this.restService.getRecords();
  }

  getImage(index: number) {
    const position: number = index + 1;
    return this.RANKING_IMAGES_PATH + position + this.EXTENSION;
  }
}
