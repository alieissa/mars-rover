import AppContext from "@/app.context"
import { useContext, useEffect, useRef, useState } from "react"

type Message = {
  message: string,
  payload: RoverInfo
}

const isMessage = (data: any): data is Message => {
  return Object.hasOwn(data, 'message') && Object.hasOwn(data, 'payload')
}

const useRoverConnection = () => {
  const { state, dispatch } = useContext(AppContext)
  const ws = useRef<WebSocket | null>(null)
  const [connection, setConnection] = useState<WebSocketConn>({ status: 'disconnected', ws: null })

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/rovers/${state.fleet}/`)

    ws.current.onopen = () => {
      setConnection({ status: 'connected', ws: ws.current! })
    }

    ws.current.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data)


      if (!isMessage(data)) return
      if (data.message === 'register') dispatch?.({ action: 'RegisterRover', payload: data.payload })
      if (data.message === 'info') dispatch?.({ action: 'UpdateRover', payload: data.payload })

    }

    ws.current.onclose = () => {
      setConnection({ status: 'disconnected', ws: null })
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  return { connection }
}

export { useRoverConnection }