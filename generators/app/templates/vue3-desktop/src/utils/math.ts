import Big from 'big.js'

// 除法并保留尾数
export const divideToPrecision = (x: number, y: number, precision: number = 2) => {
  const a: Big = new Big(x)
  return a.div(y).toFixed(precision)
}