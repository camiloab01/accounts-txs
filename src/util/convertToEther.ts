const convertToEther = (
  rawValue: bigint | undefined,
  decimals: number | undefined
) => {
  if (!rawValue || !decimals) return 0
  const valueInEth = Number(rawValue) / Math.pow(10, decimals)
  return valueInEth
}

export default convertToEther
