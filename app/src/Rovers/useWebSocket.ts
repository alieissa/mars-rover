import AppContext from "@/app.context"
import { useContext, useEffect, useRef, useState } from "react"

type Message = {
  command: string,
  payload: RoverInfo
}

const isMessage = (data: any): data is Message => {
  // const parsedMessage = JSON.parse(`${event}`)
  return Object.hasOwn(data, 'command') && Object.hasOwn(data, 'payload')
}

const useWebSocket = () => {
  const { state, dispatch } = useContext(AppContext)
  const ws = useRef<WebSocket | null>(null)
  const [connection, setConnection] = useState<WebSocketConn>({ status: 'disconnected', ws: null })

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/rovers/${state.fleet}/`)

    ws.current.onopen = () => {
      setConnection({ status: 'connected', ws: ws.current! })
    }

    ws.current.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data)

      if (!isMessage(message)) return
      if (message.command === 'register') dispatch?.({ action: 'RegisterRover', payload: message.payload })
      if (message.command === 'info') {
        dispatch?.({ action: 'UpdateRover', payload: message.payload })
      }
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

export { useWebSocket }