export interface TimetableIndex{
  version: number
  class: { [key: string]: string }
  teacher: { [key: string]: string }
  room: { [key: string]: string }
}