import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import {Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducers';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  finishedSubscription: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.store.select(fromTraining.getFinishedTrainings).subscribe((ex: Exercise[]) => {
        this.dataSource.data = ex;
     });
    // this.finishedSubscription = this.trainingService.finishedExercisesChanged.subscribe((ex: Exercise[]) => {
    //   this.dataSource.data = ex;
    // });
    this.trainingService.fetchCompletedOrCanceledExercise();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(userInput: string) {
    this.dataSource.filter = userInput.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    // if (this.finishedSubscription) {
    //   this.finishedSubscription.unsubscribe();
    // }
  }
}
