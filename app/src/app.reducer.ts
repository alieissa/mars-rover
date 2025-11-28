import { getFleet } from "./utils"
import keyBy from "lodash/keyBy"

export const initialState: State = {
  fleet: getFleet(),
  rovers: { status: 'idle' },
  newRover: { status: 'idle' },
}
// TODO Use immer or similar to simplify reducer logic
const reducer = (state: State, action: Action): State => {
  switch (action.action) {
    case 'FetchRovers':
      return { ...state, rovers: { status: 'loading', } }
    case 'FetchedRoversSuccess':
      return { ...state, rovers: { data: keyBy((action.payload.data || []).map((rover, i) => ({ ...rover, x: rover.x, y: 19 - rover.y })), 'id'), status: 'success', error: null } }
    case 'FetchedRoversFail':
      return { ...state, rovers: { error: action.payload.error, status: 'error' } }
    case 'CreateRover':
      return { ...state, newRover: { status: 'loading' } }
    case 'CreateRoverSuccess': {

      const rovers = state.rovers.status === 'success' ? state.rovers.data : {}
      return { ...state, newRover: { data: action.payload.data, status: 'success' }, rovers: { error: null, status: 'success', data: { ...rovers, [action.payload.data.id]: { ...action.payload.data, x: action.payload.data.x, y: 19 - action.payload.data.y } } } }
    }
    case 'CreateRoverFail':
      return { ...state, newRover: { error: action.payload.error, status: 'error' } }
    case 'RegisterRover': {
      const rovers = state.rovers.status === 'success' ? state.rovers.data : {}
      return { ...state, rovers: { error: null, status: 'success', data: { ...rovers, [action.payload.id]: { ...action.payload, y: 19 - action.payload.y } } } }
    }
    case 'UpdateRover': {
      const rovers = state.rovers.status === 'success' ? state.rovers.data : {}
      return { ...state, rovers: { error: null, status: 'success', data: { ...rovers, [action.payload.id]: { ...action.payload, y: 19 - action.payload.y } } } }
    }
    default:
      return state
  }
}

export default reducer