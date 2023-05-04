import { createContext } from "react"
import { Providers } from "../providers"

export const ProviderContext = createContext<Providers>(null as unknown as Providers)
ProviderContext.displayName = "Provider"

export default { ProviderContext }