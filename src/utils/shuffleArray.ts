function shuffleArray(array: any[]) {
  let result = Object.assign([], array);
  let currentIndex = result.length;
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }

  return result;
}

export default shuffleArray;
