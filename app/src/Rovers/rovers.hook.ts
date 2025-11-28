import AppContext from "@/app.context"
import api from "../api"

import { useContext, useEffect } from "react"
import { useWebSocket } from "./useWebSocket"

const useRovers = () => {
  const { state } = useContext(AppContext)
  const { connection } = useWebSocket()

  useEffect(() => {
    // if (state.rovers.status === 'success') return

    // dispatch?.({ action: 'FetchRovers' })

    // const dispatchSucess = (result: { data: any }) => {
    //   dispatch?.({ action: 'FetchedRoversSuccess', payload: { data: result.data } })
    // }
    // const dispatchError = (error: any) => {
    //   dispatch?.({ action: 'FetchedRoversFail', payload: { error: error } })
    // }

    // api.get(`enterprise/`).then(dispatchSucess).catch(dispatchError)
  }, [state.rovers.status])


  // useEffect(() => {
  //   if (data?.fleet !== state.fleet) {
  //     return
  //   }

  //   console.log('Received data for rover', data)
  //   // TODO Dispatch action to update rover state in context
  // }, [data])

  const commandRover = (id: string, command: string) => {
    if (connection.status == 'disconnected') {
      return
    }

    // Send command on websocket
    connection.ws.send(JSON.stringify({
      command: command,
      payload: { id: id },
    }))
  }


  return { rovers: state?.rovers, commandRover }
}

export { useRovers }