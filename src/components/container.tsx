interface IContainer {
  children: React.ReactNode
}
export const Container = (props: IContainer) => {
  const { children } = props
  return (
    <div className="flex w-full justify-center border-b border-gray-300 dark:border-neutral-800  rounded-xl lg:border bg-gray-200 p-8 dark:bg-zinc-800">
      {children}
    </div>
  )
}
