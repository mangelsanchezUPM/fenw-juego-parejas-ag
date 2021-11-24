import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../shared/services/rest-client.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public restClient: RestClientService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.restClient.logout();
  } 

}
