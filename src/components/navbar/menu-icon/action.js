export function translateX(percentage, done) {
  return {
    type: "TRANSLATE_X",
    percentage: percentage,
    done: done
  };
}