import AppContext from "@/app.context"

import { useContext } from "react"

const useRovers = () => {
  const { state } = useContext(AppContext)

  return { rovers: state?.rovers }
}

export { useRovers }