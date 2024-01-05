const express = require('express')
const app = express()

app.use(express.json())

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
    res.json(persons)
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
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
  })

  app.post('/api/persons', (req, res)=>{
    const person = req.body
    person.id=getRandomInt(1000)
    persons=persons.concat(person)
    
    if(!person.name){
        return res.status(400).json({error: 'name missing'});
    }else if (!person.number){
        return res.status(400).json({error: 'number missing'});
    }else if (persons.find(p=>p.name===person.name)){
        return res.status(400).json({error: 'name is already in the phonebook'});
    } else (res.json(person))
    
  })

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phone book has info for ${persons.length} people</p><p>${date}</p>`)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

