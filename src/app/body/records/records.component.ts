import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Record } from 'src/app/shared/models/record.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { RestClientService } from 'src/app/shared/services/rest-client.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  logged: boolean = false;
  globalRecords$: Observable<Record[]> = new Observable();
  personalRecords$: Observable<Record[]> = new Observable();

  constructor(
    public restClient: RestClientService,
    public loginService: LoginService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.globalRecords$ = this.restClient.getRecords();
    if (this.loginService.username) {
      this.personalRecords$ = this.restClient.getUserRecords();
      this.logged = true;
    }
  }

  deleteUserRecords() {
    this.restClient.deleteUserRecords().subscribe(
      () => {
        this.toastService.success(
          'Records personales eliminados con éxito',
          'Records eliminados'
        );
        this.personalRecords$ = this.restClient.getUserRecords();
      },
      (err) =>
        this.toastService.success(
          'No se han podido eliminar los records personales',
          'Error eliminar records'
        )
    );
  }
}
