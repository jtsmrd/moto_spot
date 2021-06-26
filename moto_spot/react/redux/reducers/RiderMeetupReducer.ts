import { Action } from 'typescript-fsa';
import * as Types from '../Types';
import * as ActionTypes from '../ActionTypes';

export interface IRiderMeetupState {
    riderMeetups: Types.RiderMeetup[];
    visibleRiderMeetups: Types.RiderMeetup[];
    getMeetupsLoading: boolean;
    getMeetupsError: object;
    createMeetupLoading: boolean;
    createMeetupError: object;
}

export const initialState: IRiderMeetupState = {
    riderMeetups: [],
    visibleRiderMeetups: [],
    getMeetupsLoading: false,
    getMeetupsError: null,
    createMeetupLoading: false,
    createMeetupError: null,
};

export const statePropName = 'riderMeetups';

export default function RiderMeetupReducer(
    state: IRiderMeetupState = initialState,
    action: Action<ActionTypes.IRiderMeetupActionsPayload>,
): IRiderMeetupState {
    switch (action.type) {
        case ActionTypes.GET_RIDER_MEETUPS_REQUEST: {
            return {
                ...state,
                getMeetupsLoading: true,
                getMeetupsError: null,
            };
        }
        case ActionTypes.GET_RIDER_MEETUPS_RESPONSE: {
            if (action.error) {
                return {
                    ...state,
                    getMeetupsError: action.payload,
                    getMeetupsLoading: false,
                };
            }
            const { riderMeetups } = action.payload as ActionTypes.IGetRiderMeetupsResponsePayload;
            return {
                ...state,
                riderMeetups: riderMeetups,
                getMeetupsLoading: false,
                getMeetupsError: null,
            };
        }
        case ActionTypes.CREATE_RIDER_MEETUP_REQUEST: {
            return {
                ...state,
                createMeetupLoading: true,
                createMeetupError: null,
            };
        }
        case ActionTypes.CREATE_RIDER_MEETUP_RESPONSE: {
            if (action.error) {
                return {
                    ...state,
                    createMeetupError: action.payload,
                    createMeetupLoading: false,
                };
            }
            const { riderMeetup } = action.payload as ActionTypes.ICreateRiderMeetupResponsePayload;
            return {
                ...state,
                riderMeetups: [...state.riderMeetups, riderMeetup],
                createMeetupLoading: false,
                createMeetupError: null,
            };
        }
        case ActionTypes.SET_VISIBLE_RIDER_MEETUPS: {
            const { visibleRiderMeetups } = action.payload as ActionTypes.ISetVisibleRiderMeetupsPayload;
            return { ...state, visibleRiderMeetups: visibleRiderMeetups };
        }
    }
    return state;
}
