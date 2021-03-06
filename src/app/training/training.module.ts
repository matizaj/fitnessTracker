import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NextTrainingComponent } from './next-training/next-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { TrainingComponent } from './training.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRouting } from './training-routing.module';
import { StoreModule} from '@ngrx/store';
import {trainingReducer} from '../training/training.reducers';


@NgModule({
  declarations: [CurrentTrainingComponent, NextTrainingComponent, PastTrainingsComponent,
    TrainingComponent, StopTrainingComponent],
  imports: [SharedModule, TrainingRouting, StoreModule.forFeature('training', trainingReducer)],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
