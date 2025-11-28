type Coords = {
  x: number,
  y: number,
}

type RoverInfo = {
  id: string,
  fleet: string,
  direction: 'N' | 'E' | 'S' | 'W',
  status: 'active' | 'inactive',
  colour?: string,
} & Coords

type State = {
  fleet: string,
  newRover?:
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error', error: unknown }
  | { data: RoverInfo, status: 'success' },
  rovers:
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error', error: unknown }
  | { data: Record<string, RoverInfo>, error: null, status: 'success' },
}

type Action =
  | { action: 'FetchRovers' }
  | { action: 'FetchedRoversSuccess'; payload: { data: Rover[]; }; }
  | { action: 'FetchedRoversFail'; payload: { error: unknown; } }
  | { action: 'CreateRover' }
  | { action: 'CreateRoverSuccess'; payload: { data: Rover } }
  | { action: 'CreateRoverFail'; payload: { error: unknown } }
  | { action: 'RoverCommand'; payload: any }
  | { action: 'RegisterRover'; payload: RoverInfo }
  | { action: 'UpdateRover'; payload: RoverInfo }

type WebSocketConn = { status: 'connected', ws: WebSocket } | { 'status': 'disconnected', ws: null }