import {
  House,
  GraduationCap,
  Student,
  Chalkboard,
  GearSix,
} from "@phosphor-icons/react"
import { Routes, Route } from "react-router-dom"
import { NavigationContainer } from "../components/navigation"
import { NavigationButton } from "../components/navigation/button"
import { NavigationSubContainer } from "../components/navigation/container"
import { HomeView } from "./homeView"
import { TimetableView } from "./timetableView"
import { TimetableInstance } from "../components/timetable/instance"

export function DesktopView() {
  return (
    <>
      <main className="flex flex-row flex-nowrap">
        <NavigationContainer>
          <NavigationSubContainer>
            <NavigationButton
              label="Strona Główna"
              href="/"
              icon={<House size={32} />}
            />
            <NavigationButton
              label="Klasa"
              href="/class"
              icon={<GraduationCap size={32} />}
            />
            <NavigationButton
              label="Nauczyciele"
              href="/teacher"
              icon={<Student size={32} />}
            />
            <NavigationButton
              label="Pokoje"
              href="/room"
              icon={<Chalkboard size={32} />}
            />
          </NavigationSubContainer>
          <NavigationSubContainer>
            <NavigationButton
              label="Settings"
              href="/settings"
              icon={<GearSix size={32} />}
            />
          </NavigationSubContainer>
        </NavigationContainer>

        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/settings" />
          <Route path="/settings/:category" />
          <Route path="/:type/" element={<TimetableView />}>
            <Route path=":symbol" element={<TimetableInstance />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}
