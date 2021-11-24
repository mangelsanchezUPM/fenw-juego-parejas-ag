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
  globalRecords$: Observable<Record[]> = new Observable();
  personalRecords$: Observable<Record[]> = new Observable();

  constructor(public restClient: RestClientService) {}

  ngOnInit(): void {
    this.globalRecords$ = this.restClient.getRecords();
    if (this.restClient.username)
      this.personalRecords$ = this.restClient.getUserRecords();
  }
}
