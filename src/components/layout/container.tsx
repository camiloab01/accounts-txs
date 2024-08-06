interface IContainer {
  children: React.ReactNode
}
export const Container = (props: IContainer) => {
  const { children } = props
  return (
    <div className="w-full justify-center text-zinc-200 rounded-xl bg-zinc-800 p-8">
      {children}
    </div>
  )
}
