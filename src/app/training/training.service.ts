import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {

constructor(private db: AngularFirestore, private ui: UIService) {}

exerciseChanged = new Subject<Exercise>();
exercisesChanged = new Subject<Exercise[]>();

finishedExercisesChanged = new Subject<Exercise[]>();

  availableExercise: Exercise[] = [];
  private runningExercise: Exercise;

  fbSubs: Subscription[] = [];

  private finishedExercises: Exercise[] = [];

  fetchAvailableExercice() {
    this.ui.loadingContentChanged.next(true);
    this.fbSubs.push(this.db.collection('availableExercise').snapshotChanges().pipe(map(docArray => {
      return  docArray.map(el => {
        return {
          id: el.payload.doc.id,
          ...el.payload.doc.data()
        } as Exercise;
      });
    })).subscribe((exercise: Exercise[]) => {
      this.ui.loadingContentChanged.next(false);
      this.availableExercise = exercise;
      this.exercisesChanged.next([...this.availableExercise]);
    }, err => {
      this.ui.loadingContentChanged.next(false);
      this.ui.showSnackBar(err.message, null, 3000);
      this.exercisesChanged.next(null);
    }
    ));
  }

  startExercise( exerciseId: string) {
    // this.db.doc('availableExercise/' + exerciseId).update({lastSelected: new Date()});
    const selectesExercise = this.availableExercise.find(exercise => exercise.id === exerciseId);
    this.runningExercise = selectesExercise;
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCanceledExercise() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((ex: Exercise[]) => {
      this.finishedExercises = ex;
      this.finishedExercisesChanged.next(ex);
    }, err => console.log(' Err message ' + err)));
  }

  private addDataToDatabase(ex: Exercise) {
    this.db.collection('finishedExercises').add(ex);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(x => x.unsubscribe());
  }
}
