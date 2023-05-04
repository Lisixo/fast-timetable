import { Category, TimetableFileProvider } from "../types/config"
import { Timetable } from "../types/timetable"
import { TimetableIndex } from "../types/timetableIndex"
import { URLWithoutHash } from "../utils"

export class FileProvider{
  public readonly type: Readonly<'file'> = 'file'
  private indexInfo: TimetableIndex
  private pathes: TimetableFileProvider["pathes"]
  private cache: { [key in Category]: Timetable[]}

  constructor(config: TimetableFileProvider){
    if(config.type !== 'file')
      throw new Error("Invalid provider type")

    this.indexInfo = {
      version: -1,
      class: {},
      teacher: {},
      room: {}
    }

    this.cache = {
      class: [],
      teacher: [],
      room: []
    }

    this.pathes = config.pathes
  }

  getIndex(symbol: 'all'): TimetableIndex
  getIndex(symbol: 'version'): number
  getIndex(symbol: Category): { [key: string]: string }
  getIndex(symbol: 'all' | 'version' | Category): TimetableIndex | number | ({ [key: string]: string }) {
    if(this.indexInfo.version === -1)
      throw new Error("No index data available. First try download data with `refreshIndex()` function")

    if(symbol === 'version')
      return this.indexInfo.version

    else if(symbol === 'class' || symbol === 'room' || symbol === 'teacher' )
      return this.indexInfo[symbol] || {}

    else if(symbol === 'all')
      return this.indexInfo

    else throw new Error('Invalid search query for `getIndex`')
  }

  async refreshIndex(): Promise<boolean>{
    try{
      const url = URLWithoutHash(this.pathes.index, window.location.href)

      const response = await fetch(url.href)
      const json = await response.json()

      this.indexInfo = json

      return true
    } catch {
      return false
    }
    
  }

  async getTimetable(type: Category, symbol: string){
    const timetableList = this.cache[type]?.filter(tt => tt.symbol === symbol)
    const isPresent = timetableList && timetableList.length > 0
    let timetable: Timetable | null = null

    if(!isPresent){
      try{
        const res = await fetch(URLWithoutHash(`${this.pathes.data}/${this.indexInfo[type][symbol]}`, location.href))
        timetable = await res.json()
        this.cache[type].push(timetable as Timetable)
      } catch{
        timetable = null
      }
    } else {
      timetable = timetableList[0]
    }
    
    return timetable
  }
}