interface IContainer {
  children: React.ReactNode
  style?: string
}
export const Container = (props: IContainer) => {
  const { children, style } = props
  return (
    <div
      className={`text-zinc-200 rounded-xl bg-zinc-800 p-8 w-full ${style ? style : ''}`}
    >
      {children}
    </div>
  )
}
