export type TimetableType = 'teacher' | 'class' | 'room'

export interface Timetable{
  symbol: string
  title: string | null
  type: TimetableType
  hours: TimetableHour[]
  generatedAt: number
  table: (TimetableLesson | string)[][][]
}

export interface TimetableHour{
  index: number,
  from: number,
  to: number
}

export interface TimetableLesson{
  group: string | null,

  class: string | null,
  lesson: string | null,
  teacher: string | null,
  room: string | null
}