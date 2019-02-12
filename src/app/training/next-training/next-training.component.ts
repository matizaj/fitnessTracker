import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-next-training',
  templateUrl: './next-training.component.html',
  styleUrls: ['./next-training.component.css']
})
export class NextTrainingComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  private isLoadingSubs: Subscription;
  trainings: Exercise[];
  private exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService, private ui: UIService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(ex => this.trainings = ex);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.onFetchTrainings();
    // this.isLoadingSubs = this.ui.loadingContentChanged.subscribe( loadingState => this.isLoading = loadingState);
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  onFetchTrainings() {
    this.trainingService.fetchAvailableExercice();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    // if (this.isLoadingSubs) {
    //   this.isLoadingSubs.unsubscribe();
    // }
  }
}
