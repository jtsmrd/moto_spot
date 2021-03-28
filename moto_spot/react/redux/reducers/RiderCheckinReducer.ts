import { Action } from 'typescript-fsa';
import * as Types from '../Types';
import * as ActionTypes from '../ActionTypes';

export interface IRiderCheckinState {
    riderCheckins: Types.RiderCheckin[];
    getCheckinsLoading: boolean;
    getCheckinsError: object;
    createCheckinLoading: boolean;
    createCheckinError: object;
}

export const initialState: IRiderCheckinState = {
    riderCheckins: [],
    getCheckinsLoading: false,
    getCheckinsError: null,
    createCheckinLoading: false,
    createCheckinError: null,
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
                getCheckinsLoading: true,
                getCheckinsError: null,
            };
        }
        case ActionTypes.GET_RIDER_CHECKINS_RESPONSE: {
            if (action.error) {
                return {
                    ...state,
                    getCheckinsError: action.payload,
                    getCheckinsLoading: false,
                };
            }
            const { riderCheckins } = action.payload as ActionTypes.IGetRiderCheckinsResponsePayload;
            return {
                ...state,
                riderCheckins,
                getCheckinsLoading: false,
                getCheckinsError: null,
            };
        }
        case ActionTypes.CREATE_RIDER_CHECKIN_REQUEST: {
            return {
                ...state,
                createCheckinLoading: true,
                createCheckinError: null,
            };
        }
        case ActionTypes.CREATE_RIDER_CHECKIN_RESPONSE: {
            if (action.error) {
                return {
                    ...state,
                    createCheckinError: action.payload,
                    createCheckinLoading: false,
                };
            }
            const { riderCheckin } = action.payload as ActionTypes.ICreateRiderCheckinResponsePayload;
            return {
                ...state,
                riderCheckins: [...state.riderCheckins, riderCheckin],
                createCheckinLoading: false,
                createCheckinError: null,
            };
        }
    }
    return state;
}
