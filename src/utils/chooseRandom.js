import shuffle from 'shuffle-array'

export const chooseRandom = (array = [], number) => {
  if (array.length <= 1) {
    return array
  }
  if (!number >= 1 && !number < array.length) {
    number = Math.floor(Math.random() * array.length) + 1
  }
  let array2 = [...array]
  shuffle(array2)
  return array2.slice(0, number)
}
