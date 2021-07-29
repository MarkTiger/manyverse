module.exports = function(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1 + ''
  let currentDate = date.getDate() + ''
  let day = date.getDay()
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day
  return `${days[day]}, ${[currentDate, month, year].join("-")}`
}