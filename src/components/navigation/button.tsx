import { ReactNode, useRef } from "react"
import { DotsThree } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"
import { FloatingArrow, arrow, autoUpdate, offset, useFloating } from "@floating-ui/react";

export function NavigationButton({ label, icon: Icon, href }: NavigationButtonProps) {
  const arrowRef = useRef(null);
  const {x, y, strategy, refs, context} = useFloating({
    placement: 'right',
    middleware: [
      offset(32),
      arrow({element: arrowRef})
    ],
    whileElementsMounted: autoUpdate
  });

  return (
    <NavLink
      ref={refs.setReference}
      to={href}
      className={({ isActive }) =>`group p-3 rounded-md flex items-center gap-4 ${ isActive ? 'bg-black text-white' : 'hover:bg-black hover:text-white'} transition-all cursor-pointer`}
    >
      {Icon ?? <DotsThree size={32} />}
      <span className="hidden xl:block truncate">{label}</span>
      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          width: 'max-content',
        }}
        className="bg-black rounded-md p-2 text-white font-bold transition-all hidden group-hover:block xl:hidden group-hover:xl:hidden z-10"
      >
        <FloatingArrow 
          ref={arrowRef} 
          context={context} 
        />
        {label}
      </div>
    </NavLink>
  )
}

export interface NavigationButtonProps {
  label: string
  icon?: ReactNode
  href: string
}
