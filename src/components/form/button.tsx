interface IButton {
  text: string
}

export default function Button(props: IButton) {
  const { text } = props

  return (
    <button className="bg-rose-500 hover:bg-rose-500/70 text-white font-bold rounded-full w-full h-10">
      {text.toUpperCase()}
    </button>
  )
}
