import { createContext } from "react"

export interface Darkmode{
  state: boolean,
  update: React.Dispatch<React.SetStateAction<boolean>>
}

export const DarkmodeContext = createContext<Darkmode>({ state: null, update: null } as unknown as Darkmode)
DarkmodeContext.displayName = "Darkmode"

export default { DarkmodeContext }