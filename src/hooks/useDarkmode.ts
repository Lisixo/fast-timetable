import React, { useEffect, useState } from "react"
import { Darkmode } from "../contexts/darkmode"

export const useDarkmode = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>, Darkmode] => {
  const storage = window.localStorage

  let predef = false

  if(window && storage && storage.getItem('dark-mode') && typeof JSON.parse(storage.getItem('dark-mode') as string) === 'boolean') 
    predef = JSON.parse(storage.getItem('dark-mode') as string) as boolean
  else if(window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) 
    predef = true

  const [darkmode, setDarkmode] = useState<boolean>(predef)

  useEffect(() => {
    if(darkmode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    storage.setItem('dark-mode', `${darkmode}`)
  }, [darkmode])

  return [darkmode, setDarkmode, { state: darkmode, update: setDarkmode }]
}