import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeExercise: Exercise;
}
export interface State extends fromRoot.State {
  training: TrainingState;
}

const initailState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeExercise: null
};

export function trainingReducer(state = initailState, action: TrainingActions) {
    switch (action.type) {

        case SET_AVAILABLE_TRAININGS:
        return {...state, availableExercises: action.payload};

        case SET_FINISHED_TRAININGS:
        return {...state, finishedExercises: action.payload};

        case START_TRAINING:
        return {...state, activeExercise: action.payload};

        case STOP_TRAINING:
        return {...state, activeExercise: null};

        default:
        return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableTrainings = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedTrainings = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeExercise);
