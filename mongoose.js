
// Require the necessary modules
const mongoose = require('mongoose');

// Connect to the database using the provided MongoDB Atlas URI
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));


// Create a person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

// Create a person model using the person schema
const Person = mongoose.model('Person', personSchema);


// Create a new person document instance
const person = new Person({
  name: 'John Doe',
  age: 25,
  favoriteFoods: ['Pizza', 'Burger']
});

// Save the person document to the database
person.save(function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person saved:', data);
  }
});


// Create an array of people
const arrayOfPeople = [
  { name: 'Jane Smith', age: 30, favoriteFoods: ['Sushi', 'Pasta'] },
  { name: 'Mike Johnson', age: 35, favoriteFoods: ['Steak', 'Chicken'] },
  { name: 'Emily Davis', age: 28, favoriteFoods: ['Ice Cream', 'Chocolate'] }
];

// Create multiple people using model.create()
Person.create(arrayOfPeople, function(err, people) {
  if (err) {
    console.error(err);
  } else {
    console.log('People created:', people);
  }
});


// Find all the people with a given name
Person.find({ name: 'John Doe' }, function(err, people) {
  if (err) {
    console.error(err);
  } else {
    console.log('People found:', people);
  }
});


// Find a person with a certain food in their favorites
Person.findOne({ favoriteFoods: 'Pizza' }, function(err, person) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person found:', person);
  }
});


// Find a person by their _id
const personId = '607e787bd385d821f0c3c882';
Person.findById(personId, function(err, person) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person found:', person);
  }
});


Person.findById(personId, function(err, person) {
  if (err) {
    console.error(err);
  } else {
    person.favoriteFoods.push('Hamburger');
    person.save(function(err, updatedPerson) {
      if (err) {
        console.error(err);
      } else {
        console.log('Person updated:', updatedPerson);
      }
    });
  }
});
