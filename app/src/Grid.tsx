import { Circle } from "lucide-react"
import { useRovers } from "./Rovers/rovers.hook"


const Grid = () => {
  const { rovers } = useRovers()

  const getRover = (x: number, y: number) => {
    if (rovers.status !== 'success') return undefined

    return Object.values(rovers?.data)?.find((rover) => rover.x === x && rover.y === y)
  }

  const renderRover = (rover?: any) => {

    if (!rover) return null
    const fill = rover.status === 'active' ? '#26b585' : '#ff0000'
    const color = rover.status === 'active' ? '#26b585' : '#770000'
    return <Circle key={rover.id} color={color} fill={fill} width="20" height="20" />
  }

  return <div className='flex gap-0.5'>
    {
      [...Array(20)].map((_, row) => {
        return <div key={`y-${row}`} className="flex flex-col gap-0.5">
          {[...Array(20)].map((_, col) => {
            const rover = getRover(row, col)
            return <div key={`x-${col}-${row}`} className='bg-amber-200 flex gap-1 w-5 h-5' onClick={() => console.log(row, col)}>
              {renderRover(rover)}
            </div>
          })}
        </div>
      })
    }
  </div>
}

export default Grid