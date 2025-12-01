import { Circle } from "lucide-react"
import { useRovers } from "./rovers.hook"
import { RoverCommand } from "./RoverCommand"
import { useWebSocket } from "@/useWebSocket"
import { useState } from "react"


const Rovers = () => {
  const [openCommandId, setOpenCommandId] = useState<string | null>(null)

  const { rovers } = useRovers()
  const { connection } = useWebSocket()

  const renderRover = (rover: RoverInfo) => {
    const fill = rover.status === 'active' ? '#26b585' : '#ff0000'
    const color = rover.status === 'active' ? '#26b585' : '#770000'
    return <Circle key={rover.id} color={color} fill={fill} width="20" height="20" onClick={() => setOpenCommandId(rover.id)} />
  }

  const handleRoverCommand = (id: RoverInfo['id'], command: string) => {

    setOpenCommandId(null)
    if (connection.status === 'disconnected') return

    connection.ws.send(JSON.stringify({
      message: "command",
      payload: { id: id, value: command },
    }))

  }

  const onOpenChange = (open: boolean) => {
    !open && setOpenCommandId(null)
  }

  switch (rovers.status) {
    case 'idle':
    case 'loading':
      return <div>Loading rovers...</div>
    case 'error':
      return <div>Error loading rovers: {String(rovers.error)}</div>
    case 'success':
      return <div className="flex flex-wrap h-fit gap-1 max-w-34">
        {Object.values(rovers.data).map((rover) => {
          return <RoverCommand key={rover.id} id={rover.id} isOpen={openCommandId === rover.id} onOpenChange={onOpenChange} onCommand={handleRoverCommand} >{renderRover(rover)}</RoverCommand>
        })}
      </div>
  }

}
export default Rovers