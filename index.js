require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.static('dist'))


morgan.token('content', (request) =>
  request.method === 'POST' && request.body.name
    ? JSON.stringify(request.body)
    : null
)


let persons = [
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
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons=>{
      res.json(persons)
    })
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
      res.json(person)
    })
  })

  app.post('/api/persons', (req, res)=>{
    const body = req.body
    body.id=getRandomInt(1000)
    if(body.name === undefined){
        return res.status(400).json({error: 'name missing'})
    }else if (body.number === undefined){
        return res.status(400).json({error: 'number missing'})
    // }else if (persons.find(p=>p.name===name)){
    //     return res.status(400).json({error: 'name is already in the phonebook'});
    } 

    const person = new Person({
      name: body.name,
      number: body.number
    })
    console.log(person)

    person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
      console.log('Person saved to the database:', savedPerson);
    })
    .catch((error) => {
      console.error('Error saving person to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });   
  })

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phone book has info for ${persons.length} people</p><p>${date}</p>`)
  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

