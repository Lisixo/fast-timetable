import { useContext, useEffect, useState } from "react";
import { Timetable } from "../../types/timetable";
import { Category, LoadingState } from "../../types/config";
import { ProviderContext } from "../../contexts/provider";
import { useParams } from "react-router-dom";
import { TimetableRenderer } from "./renderer";
import { ErrorBoundary } from "react-error-boundary";
import { TimetableErrorScreen } from "./error";

export function TimetableInstance() {
  const [data, setData] = useState<Timetable | null>(null)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)

  const { type, symbol } = useParams() as { [key: string]: string }
  const provider = useContext(ProviderContext)

  async function setTimetable(){
    setDataLoaded(false)
    setData(await provider.getTimetable(type as Category, symbol))
    setDataLoaded(true)
  }

  useEffect(() => {
    setTimetable()
  }, [type, symbol])

  return (
    data && dataLoaded
    ? <ErrorBoundary fallback={<TimetableErrorScreen />}><TimetableRenderer data={data} /></ErrorBoundary>
    : !data && dataLoaded
    ? <>no data about timetable</>
    : !dataLoaded
    ? <>Loading...</>
    : <>Not registered error happened {'＞︿＜'}</>
  )
}