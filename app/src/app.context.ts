import { createContext, type Dispatch } from "react";
import { getFleet } from "./utils";
import { initialState } from "./app.reducer";

type AppContext = {
  dispatch?: Dispatch<Action>
  state: State
}
console.log('initial fleet', getFleet())
const AppContext = createContext<AppContext>({ state: initialState })

export default AppContext