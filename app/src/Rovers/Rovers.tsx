import { Circle } from "lucide-react"
import { useRovers } from "./rovers.hook"
import { RoverCommand } from "./RoverCommand"

const Rovers = () => {
  const { rovers, commandRover } = useRovers()

  const renderRover = (rover: RoverInfo) => {
    const fill = rover.status === 'active' ? '#26b585' : '#ff0000'
    const color = rover.status === 'active' ? '#26b585' : '#770000'
    return <Circle key={rover.id} color={color} fill={fill} width="20" height="20" />
  }

  const handleRoverCommand = (id: RoverInfo['id'], command: string) => {
    commandRover(id, command)
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
          return <RoverCommand key={rover.id} id={rover.id} onCommand={(command: string) => handleRoverCommand(rover.id, command)} >
            {renderRover(rover)}
          </RoverCommand>
        })}
      </div>
  }

}

export default Rovers