import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './training.reducers';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  // ongoingTraining = false;
  ongoingTraining$: Observable<boolean>;
  exercise: any;
  subscription: Subscription;
  constructor(private trainingService: TrainingService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.subscription = this.trainingService.exerciseChanged.subscribe(data => {
    //   this.exercise = data;
    //   if (data) {
    //     this.ongoingTraining = true;
    //   } else {
    //     this.ongoingTraining = false;
    //   }
    // });
    this.ongoingTraining$ = this.store.select(fromRoot.getIsTraining);

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
