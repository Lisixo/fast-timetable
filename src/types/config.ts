// export interface TimetableAppConfig{

// }

export interface TimetableHostConfig{
  version: number,
  provider: TimetableFileProvider
  accentColor?: string
}

export interface TimetableFileProvider{
  type: "file"
  pathes: {
    index: string
    data: string
  }
}

export enum LoadingState{
  LOADING = 0,
  OK = 1,
  ERROR = 2
}

export type Category = 'class' | 'teacher' | 'room'