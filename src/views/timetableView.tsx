/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-empty-pattern */
import { Outlet, useNavigate, useParams } from "react-router-dom"
import Select from "react-select"
import { createSelectOptions } from "../utils"
import { useContext, useEffect, useMemo, useState } from "react"
import { ProviderContext } from "../contexts/provider"

const supportedParams = ["class", "teacher", "room"]
const DEFAULT_SELECT_VALUE = { value: undefined, label: "---" }

export function TimetableView({}: TimetableViewProps) {
  const { type, symbol } = useParams() as { [key: string]: string }
  const navigate = useNavigate()
  const provider = useContext(ProviderContext)

  // const [index, setIndex] = useState<undefined | number>(undefined)
  const [selected, setSelected] = useState<({value: string, label: string} | {value: undefined, label: string})>(DEFAULT_SELECT_VALUE)
  const options = useMemo(() => {
    return [
      DEFAULT_SELECT_VALUE,
      ...createSelectOptions(provider.getIndex(type as ("class" | "teacher" | "room"))).sort((a,b) => parseInt(a.value) - parseInt(b.value))
    ]
  }, [type])

  useEffect(() => {
    setSelected(DEFAULT_SELECT_VALUE)
  }, [type])
  
  if (!type || !supportedParams.includes(type ?? "")) navigate("/error")

  const index = options.map(val => val.value).indexOf(symbol)
  const defaultValueIndex = index !== -1 ? index : 0

  function changeHref(){
    selected?.value
      ? navigate(`/${type}/${selected?.value}`)
      : navigate(`/${type}`)
  }

  useEffect(() => changeHref(), [selected])

  return (
    <div className="p-4 w-full">
      <div className="text-3xl font-bold mb-4">
        Plan Lekcji: {type.at(0)?.toUpperCase() + type.slice(1)}
      </div>
      <hr />
      <div className="f-full flex justify-between items-center my-4">
        <Select
          options={options}
          value={selected}
          defaultValue={options[defaultValueIndex]}
          // onChange={(data) =>
          //   data?.value
          //     ? navigate(`/${type}/${data?.value}`)
          //     : navigate(`/${type}`)
          // }
          onChange={(data) => setSelected(data as any)}
        />
      </div>
      <hr />
      <Outlet />
    </div>
  )
}

export interface TimetableViewProps {}
