import type { FormEvent, PropsWithChildren } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Label } from "../components/ui/label"

type Props = {
  id: RoverInfo['id']
  onCommand: (command: string) => void
}
const RoverCommand = ({ id, onCommand, children }: PropsWithChildren<Props>) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const command = String(formData.get('command'))

    onCommand(command)
  }

  return <Popover>
    <PopoverTrigger asChild className="mb-4">
      {children}
    </PopoverTrigger>
    <PopoverContent side="bottom" align="end" className="w-80">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <h4 className="leading-none font-medium">Rover</h4>
          <p className="text-muted-foreground text-sm">
            Command to move rover ({id}).
          </p>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="x">Command:</Label>
          <Input
            id="command"
            name="command"
            required
            className="col-span-3 h-8"
          />
        </div>
        <Button variant="default">Submit</Button>
      </form>
    </PopoverContent>
  </Popover>
}

export { RoverCommand }