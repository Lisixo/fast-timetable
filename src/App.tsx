import { HashRouter as AppRouter } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { TimetableHostConfig } from "./types/config"
import { URLWithoutHash } from "./utils"
import { FileProvider, Providers } from "./providers"
import { DesktopView } from "./views/desktopView"
import { MobileView } from "./views/mobileView"
import { LoadingScreenView } from "./views/loadingView"
import { ProviderContext } from "./contexts/provider"

function MainApp() {
  const [config, setConfig] = useState<TimetableHostConfig | null>(null)
  const [configState, setConfigState] = useState<
    "loading" | "loaded" | "error"
  >("loading")
  const provider = useRef<Providers>()

  useEffect(() => {
    (async () => {
      try {
        setConfigState("loading")

        const res = await fetch(
          URLWithoutHash("./timetable.config.json", window.location.href)
        )
        const conf = await res.json()

        setConfig(conf)

        const provid = new FileProvider(conf.provider)

        await provid.refreshIndex()
  
        provider.current = provid

        setConfigState("loaded")
      } catch (e) {
        setConfig(null)
        setConfigState("error")
      }
    })()
  }, [])

  // useEffect(() => {
  //   (async () => {
  //     if (!provider.current && config) {
  //       if (config.provider.type === "file") {
  //         const provid = new FileProvider(config.provider)
  //         await provid.refreshIndex()
  
  //         provider.current = provid
  //       } else throw new Error("Invalid provider type")
  //     }
  //   })()
  // }, [config])

  return (
    <>
      {config && configState === "loaded" && provider.current ? (
        <AppRouter>
          <ProviderContext.Provider value={provider.current}>
            {window.matchMedia("(pointer:coarse)").matches ? (
              <MobileView />
            ) : (
              <DesktopView />
            )}
          </ProviderContext.Provider>
        </AppRouter>
      ) : configState === "loading" ? (
        <LoadingScreenView />
      ) : (
        <div>Error</div>
      )}
    </>
  )
}

export default MainApp
