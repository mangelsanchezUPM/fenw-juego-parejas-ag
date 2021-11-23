import { Component, OnInit } from '@angular/core';
import { RestClientService } from 'src/app/shared/services/rest-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private restClient: RestClientService) { }

  ngOnInit(): void {
    
  }
}
