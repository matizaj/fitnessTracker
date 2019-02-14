import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from '../training/training.actions';
import * as fromRoot from '../training/training.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {

constructor(private db: AngularFirestore, private ui: UIService, private store: Store<fromRoot.TrainingState>) {}

exerciseChanged = new Subject<Exercise>();
exercisesChanged = new Subject<Exercise[]>();

finishedExercisesChanged = new Subject<Exercise[]>();

  availableExercise: Exercise[] = [];
  private runningExercise: Exercise;

  fbSubs: Subscription[] = [];

  private finishedExercises: Exercise[] = [];

  fetchAvailableExercice() {
    // this.ui.loadingContentChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercise').snapshotChanges().pipe(map(docArray => {
      return  docArray.map(el => {
        return {
          id: el.payload.doc.id,
          ...el.payload.doc.data()
        } as Exercise;
      });
    })).subscribe((exercise: Exercise[]) => {
      // this.ui.loadingContentChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      // this.availableExercise = exercise;
      // this.exercisesChanged.next([...this.availableExercise]);
      this.store.dispatch(new Training.SetAvailableTraining(exercise));
    }, err => {
      // this.ui.loadingContentChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.ui.showSnackBar(err.message, null, 3000);
      this.exercisesChanged.next(null);
    }
    ));
  }

  startExercise( exerciseId: string) {
    // this.db.doc('availableExercise/' + exerciseId).update({lastSelected: new Date()});
    const selectesExercise = this.availableExercise.find(exercise => exercise.id === exerciseId);
    // this.runningExercise = selectesExercise;
    // this.exerciseChanged.next({...this.runningExercise});
    this.store.dispatch(new Training.StartTraining(exerciseId));
  }

  // getRunningExercise() {
  //   return {...this.runningExercise};
  // }

  completeExercise() {
    this.store.select(fromRoot.getActiveTraining).subscribe(ex => {
      this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromRoot.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({...this.runningExercise,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'});
      // this.runningExercise = null;
      // this.exerciseChanged.next(null);
      this.store.dispatch(new Training.StopTraining());
    });

  }

  fetchCompletedOrCanceledExercise() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((ex: Exercise[]) => {
      // this.finishedExercises = ex;
      // this.finishedExercisesChanged.next(ex);
      this.store.dispatch(new Training.SetFinishedTraining(ex));
    }, err => console.log(' Err message ' + err)));
  }

  private addDataToDatabase(ex: Exercise) {
    this.db.collection('finishedExercises').add(ex);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(x => x.unsubscribe());
  }
}
