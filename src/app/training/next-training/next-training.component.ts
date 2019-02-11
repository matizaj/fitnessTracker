import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-next-training',
  templateUrl: './next-training.component.html',
  styleUrls: ['./next-training.component.css']
})
export class NextTrainingComponent implements OnInit, OnDestroy {

  isLoading = false;
  private isLoadingSubs: Subscription;
  trainings: Exercise[];
  private exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService, private ui: UIService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(ex => this.trainings = ex);
    this.onFetchTrainings();
    this.isLoadingSubs = this.ui.loadingContentChanged.subscribe( loadingState => this.isLoading = loadingState);
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
    if (this.isLoadingSubs) {
      this.isLoadingSubs.unsubscribe();
    }
  }
}
