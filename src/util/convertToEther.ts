const convertToEther = (rawValue: bigint, decimals: number) => {
  const valueInEth = Number(rawValue) / Math.pow(10, decimals)
  return valueInEth
}

export default convertToEther
