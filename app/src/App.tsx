import { useReducer } from 'react'
import './App.css'
import Grid from './Grid'
import Rovers from './Rovers/Rovers'
import AppContext from './app.context'
import appReducer, { initialState } from './app.reducer'


function App() {
  const [state, dispatch] = useReducer<any, any>(appReducer, initialState)

  return (
    <AppContext.Provider value={{ dispatch, state }}>
      <div className='flex gap-4'>
        <Grid />
        <Rovers />
      </div>
    </AppContext.Provider>
  )
}

export default App
