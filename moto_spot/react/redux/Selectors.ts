import { statePropName, IRiderCheckinState } from './reducers/RiderCheckinReducer';

export interface IAppState {
    [statePropName]: IRiderCheckinState;
    [otherKeys: string]: any;
}

const getRiderCheckinState = (state: IAppState) => state[statePropName];

export const getRiderCheckins = (state: IAppState) => getRiderCheckinState(state).riderCheckins;
