const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:fullstack123@cluster0.b8p5hpe.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)
.then(() => {
  console.log('Connected to MongoDB');
  // Additional code to run after successful connection
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv[3]){
const person = new Person({
  name,
  number,
  important: true,
})

person.save().then(result => {
    console.log(`Added ${person.name} numer ${person.number} to phonebook`)
  mongoose.connection.close()
})}

Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    });
    mongoose.connection.close()
  })
