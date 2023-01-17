const { faker } = require('@faker-js/faker')
const { shuffle } = require('lodash')

const users = require('./User.json')

const complaints = require('./content/complaints.json')
const complaints2 = require('./content/complaints-3.json')
const complaints3 = require('./content/complaints-3.json')
const femaleComplaints = require('./content/female-complaints.json')
const socialMediaComplaints = require('./content/social-media-complaints.json')
const technologyComplaints = require('./content/technology-complaints.json')
const maleComplaints = require('./content/male-complaints.json')
const horrorStories = require('./content/horror-stories.json')
const oldTimeyStories = require('./content/oldTimeyStories.json')

const posts = []

users.forEach((user, index) => {
  const collections = [
    complaints,
    complaints2,
    complaints3,
    socialMediaComplaints,
    technologyComplaints,
    horrorStories,
    oldTimeyStories
  ]

  const collectionsForUser =
    user.gender === 'MALE'
      ? [...collections, maleComplaints]
      : [...collections, femaleComplaints]

  const randomlyOrderedCollections = shuffle(collectionsForUser)

  randomlyOrderedCollections.forEach((collection) => {
    const post = {
      text: collection[index],
      createdAt: faker.date.recent(),
      createdById: user._id
    }

    posts.push(post)
  })
})

console.log(JSON.stringify(shuffle(posts)))
