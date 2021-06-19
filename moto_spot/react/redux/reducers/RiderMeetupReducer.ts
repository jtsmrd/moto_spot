import { Action } from 'typescript-fsa';
import * as ActionTypes from '../ActionTypes';

export interface IRiderMeetupState {
    isCreatingMeetup: boolean;
}

export const initialState: IRiderMeetupState = {
    isCreatingMeetup: false,
};

export const statePropName = 'riderMeetups';

export default function RiderMeetupReducer(
    state: IRiderMeetupState = initialState,
    action: Action<ActionTypes.IRiderMeetupActionsPayload>,
): IRiderMeetupState {
    switch (action.type) {
        case ActionTypes.SET_CREATE_MEETUP_VIEW_STATE: {
            const { isCreatingMeetup } = action.payload as ActionTypes.ISetCreateMeetupViewStatePayload;
            return { ...state, isCreatingMeetup: isCreatingMeetup };
        }
    }
    return state;
}
