import { Link } from "react-router-dom"
import { Timetable, TimetableLesson } from "../../types/timetable"

const BASE_HEADER = ['Nr', 'Godzina']
const WEEKS = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]

export function TimetableRenderer({ data }: { data: Timetable }) {
  return (
    <div className="flex flex-col gap-4">
      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">{data.symbol}</h1>
        { data.title && <h3 className="text-xl">{data.title}</h3> }
      </div>

      {/* TIMETABLE */}
      <table className="border-collapse">
        <tbody>
          <tr>
            { 
              // Concat BASE_HEADER with good amouth of WEEK (Days)
              [...BASE_HEADER, ...WEEKS.slice(0, data.table.length)].map((el, idx) => <th key={idx}>{el}</th>)
            }
          </tr>
          {
            // Print every row of timetable
            // TODO: Rework to songle components
            data.hours.map((hour, rowidx) => <tr key={rowidx}>
                <td className="text-center">{hour.index}</td>
                <td className="text-center">{toTime(new Date(hour.from * 1000))} - {toTime(new Date(hour.to * 1000))}</td>
                {
                  data.table.map((_, inidx) => 
                    <td key={inidx}>
                      {
                        data.table[inidx][rowidx] && data.table[inidx][rowidx]?.map((cellData, i) =>    
                          <div key={i} className="flex gap-1">
                            <CellDisplay data={cellData} type={data.type} />
                          </div>
                        )
                      }
                    </td>
                  )
                }
              </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

const CellDisplay = ({type, data}:{type: string, data: string | TimetableLesson}) => {
  if(typeof data === 'string')
    return (<span>{data}</span>)

  if(type === "class") return <>
    <span>{data.lesson}</span>
    <Link to={`/teacher/${data.teacher}`}>{data.teacher}</Link>
    <Link to={`/room/${data.room}`}>{data.room}</Link>
  </>
  else if(type === "teacher") return <>
    <Link to={`/class/${data.class}`}>{data.class}</Link>
    <span>{data.lesson}</span>
    <Link to={`/room/${data.room}`}>{data.room}</Link>
  </>
  else if(type === "room") return <>
    <Link to={`/teacher/${data.teacher}`}>{data.teacher}</Link>
    <Link to={`/class/${data.class}`}>{data.class}</Link>
    <span>{data.lesson}</span>
  </>
  else return <>err</>
}

const toTime = (date: Date) => {
  const _m = date.getUTCMinutes()
  const _h = date.getUTCHours()
  const m = _m >= 0 && _m <= 9 ? `0${_m}` : `${_m}`
  const h = _h >= 0 && _h <= 9 ? `0${_h}` : `${_h}`
  return `${h}:${m}`
}