export const NavigationContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen w-[5.5rem] bg-gray-100 xl:w-64 p-4 flex flex-col justify-between gap-1 flex-shrink-0">
    {children}
  </div>
)

export const NavigationSubContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    {children}
  </div>
)