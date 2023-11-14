require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')



const application = express()
application.use(express.json())
application.use(express.static('dist'))
application.use(morgan('tiny'))
application.use(cors())

// the list of persons in the phonebook
/***let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramob",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]***/


// sends "persons" to browser
application.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Prints the info of how many persons in the phonebook and 
//current time when request was sent
// sends that info to browser
application.get('/', (req, res) =>{
    const timeNow = new Date()
    const howManyPeople = `Phonebook has info for ${persons.length} people`
    const response = 
    `<html>
        <body>
            <p>${howManyPeople}</p>
            <p>Current time: ${timeNow}</p>
        </body>
    </html>`
    res.send(response)
})

application.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
  })
  // send the DELETE request to server and deletes person from the phonebook
  application.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
  })

  const generateIdRandom = () => {
    return Math.floor(Math.random() * 100000000000)
  }
  
  application.post('/api/persons', (req, res) => {
    const body = req.body
  
    if (!body.name || !body.number) {
      return res.status(400).json({ 
        error: 'name or number is missing' 
      })
    }

    const existingPerson = persons.find((person) => person.name === body.name)

    if (existingPerson) {
      return res.status(400).json({ 
        error: 'name is already in the phonebook' 
      })
    }

  
    const addPerson = {
      name: body.name,
      number: body.number,
      id: generateIdRandom(),
    }
  
    persons = persons.concat(addPerson)
  
    res.json(addPerson)
  })




const PORT = process.env.PORT
application.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})