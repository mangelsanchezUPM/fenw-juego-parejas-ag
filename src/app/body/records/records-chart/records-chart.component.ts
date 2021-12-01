import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Record } from 'src/app/shared/models/record.model';

@Component({
  selector: 'app-records-chart',
  templateUrl: './records-chart.component.html',
  styleUrls: ['./records-chart.component.css'],
})
export class RecordsChartComponent implements OnChanges, OnInit, OnDestroy {
  private RANKING_IMAGES_PATH: string =
    '../../../../../assets/ranking-position/';
  private EXTENSION: string = '.png';

  @Input() records$: Observable<Record[]> = new Observable();

  recordsPending: boolean = true;
  recordsPendingSub: Subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['records$'] && changes['records$'].isFirstChange()) {
      this.recordsPending = true;
      this.recordsPendingSub = this.records$.subscribe(
        () => (this.recordsPending = false)
      );
    }
  }
  ngOnInit(): void {
    this.recordsPendingSub = this.records$.subscribe(
      () => (this.recordsPending = false)
    );
  }
  ngOnDestroy(): void {
    this.recordsPendingSub.unsubscribe();
  }
  getImage(index: number) {
    const position: number = index + 1;
    return this.RANKING_IMAGES_PATH + position + this.EXTENSION;
  }
}
