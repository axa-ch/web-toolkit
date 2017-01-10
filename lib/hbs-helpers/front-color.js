const frontColor = (backColor) => {
  // assuming `backColor` is in #rrggbb format
  const r = parseInt(backColor.substr(1, 2), 16)
  const g = parseInt(backColor.substr(3, 2), 16)
  const b = parseInt(backColor.substr(5, 2), 16)

  // Counting the perceptive luminance (http://stackoverflow.com/a/1855903/186965)
  const a = 1 - (((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255)

  return a < 0.5 ? '#333333' : '#ffffff'
}

export default frontColor
