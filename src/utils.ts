interface SelectOption{
  value: string
  label: string
}

export const URLWithoutHash = (url: string | URL, base?: string | URL) => {
  const inst = new URL(url, base)
  inst.hash = ""
  return inst
}

export const createSelectOptions = (data: {[key: string]: string}) => {
  const opt: SelectOption[] = []

  for(const key of Object.keys(data))
    opt.push({ label: key, value: key })

  return opt
}