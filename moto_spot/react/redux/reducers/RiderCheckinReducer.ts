import { Action } from 'typescript-fsa';
import * as Types from '../Types';
import * as ActionTypes from '../ActionTypes';

export interface IRiderCheckinState {
    riderCheckins: Types.RiderCheckin[];
    loading: boolean;
    error: object;
}

export const initialState: IRiderCheckinState = {
    riderCheckins: [],
    loading: false,
    error: null,
};

export const statePropName = 'riderCheckins';

export default function RiderCheckinReducer(
    state: IRiderCheckinState = initialState,
    action: Action<ActionTypes.IRiderCheckinActionsPayload>,
): IRiderCheckinState {
    switch (action.type) {
        case ActionTypes.GET_RIDER_CHECKINS_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case ActionTypes.GET_RIDER_CHECKINS_RESPONSE: {
            if (action.error) {
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                };
            }
            const { riderCheckins } = action.payload as ActionTypes.IGetRiderCheckinsResponsePayload;
            return {
                ...state,
                riderCheckins,
                loading: false,
            };
        }
    }
    return state;
}
