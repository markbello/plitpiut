const jobs50s = require('./1950s-jobs.json')
const jobs60s = require('./1960s-jobs.json')

const jobTitles50s = Object.keys(jobs50s).reduce((accumulator, companyName) => {
  const titles = jobs50s[companyName]
  const formattedTitles = titles.map((title) => `${title} at ${companyName}`)
  return [...accumulator, ...formattedTitles]
}, [])
const jobTitles60s = Object.keys(jobs60s).reduce((accumulator, companyName) => {
  const titles = jobs60s[companyName]
  const formattedTitles = titles.map((title) => `${title} at ${companyName}`)
  return [...accumulator, ...formattedTitles]
}, [])

const allTitles = [...jobTitles50s, ...jobTitles60s]
console.log(allTitles)
