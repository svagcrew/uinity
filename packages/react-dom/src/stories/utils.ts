export const getOptionsArgType = (
  propName: string,
  options: Array<string | number>,
  control: 'radio' | 'select' = 'radio'
) => ({
  [propName]: {
    options,
    control: { type: control },
  },
})

export const getOptionsFormKeysArgType = (
  propName: string,
  obj: Record<string, any>,
  control: 'radio' | 'select' = 'radio'
) => {
  return getOptionsArgType(propName, Object.keys(obj), control)
}
