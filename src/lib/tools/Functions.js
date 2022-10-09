// l - list of numbers
// n - a number

export function summation(l) {
  return l.reduce((a, b) => a + b, 0)
}

export function factorial(n) {
  if (n === 0) {
    return 1
  }
  if (n/Math.floor(n) > 1) {
    n = Math.floor(n)
  }
  const array = Array.from(Array(n+1).keys())
    .filter((n) => n > 0)
  return array.reduce((a, b) => b * a, 1)
}


export function fibonacci(n) {
  for (var fib = [0,1], i = 1; i< n; i++) {
      fib.push(
        fib[i] + fib[i-1]
      )
  }
  return Array.from(new Set(fib))
}
