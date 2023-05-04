import { CircleNotch } from "@phosphor-icons/react";

export function LoadingScreenView() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <CircleNotch size={32} className="animate-spin" />
      <span>Loading information</span>
    </div>
  )
}
