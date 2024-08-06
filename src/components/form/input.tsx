export function AddressInput() {
  return (
    <input
      className="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
      id="address"
      type="text"
      placeholder="0x..."
    ></input>
  )
}

export function NumberInput() {
  return (
    <input
      className="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
      id="address"
      type="number"
      placeholder="2 ETH"
    ></input>
  )
}
