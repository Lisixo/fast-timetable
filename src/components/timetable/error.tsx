import { Skull } from "@phosphor-icons/react";

export function TimetableErrorScreen(){
  return (
    <div className="flex flex-col justify-center items-center gap-4 my-8">
      <Skull size={128} weight="duotone" />
      Unexpected error when site wants render this timetable 😿
    </div>
  )
  
}