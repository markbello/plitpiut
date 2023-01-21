const { shuffle } = require('lodash')
const allUsers = require('./User.json')

const maleBios = require('./content/initial-bios/mens-bios.json')
const shuffledMaleBios = shuffle(maleBios)

const femaleBios = require('./content/initial-bios/womens-bios.json')
const shuffledFemaleBios = shuffle(femaleBios)

const usersWithBios = allUsers.map((user, index) => {
  const bios = user.gender === 'MALE' ? shuffledMaleBios : shuffledFemaleBios
  let bio = bios[index]

  if (!bio) {
    const newShuffledBios = shuffle(bios)
    bio = newShuffledBios[0]
  }

  return { ...user, bio }
})

console.log(usersWithBios)
