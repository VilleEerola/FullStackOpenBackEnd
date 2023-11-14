const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://puhelinluettelo:${password}@puhelinluettelo.q9sjdjm.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String ,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const closeConnection = () => {
    mongoose.connection.close(() => {
        console.log(`Connection to database closed`)
      process.exit(0)
    })
  }

if (process.argv.length === 3) {
    Person
    .find({})
    .then(persons => {
      console.log('Phonebook:')
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    })
    .finally(() => closeConnection())
  } else {
    const newPerson = new Person({
      name: name,
      number: number,
    })
  
    newPerson
      .save()
      .then(result => {
        console.log(`Added ${name} with number ${number} to the phonebook.`)
        
      })
      .finally(() => closeConnection())
  }
  