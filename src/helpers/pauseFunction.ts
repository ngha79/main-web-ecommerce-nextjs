export default function pauseFunction(delay: number) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!')
    }, delay)
  })
  return promise
}
