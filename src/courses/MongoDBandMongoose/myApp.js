require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const PersonSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String],
});

let Person = mongoose.model('Person', PersonSchema);

const createAndSavePerson = (done) => {
    let newPerson = new Person({
        name: "Naufal",
        age: 20,
        favoriteFoods: [
            "Rice",
            "Bread",
            "Potato",
        ],
    });

    newPerson
        .save((err, data) => {
            if (err) done(err);
            done(null, data);
        });
};

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
        if (err) done(err);
        done(null, data);
    });
};

const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, data) => {
        if (err) done(err);
        done(null, data);
    });
};

const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
        if (err) done(err);
        done(null, data);
    });
};

const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
        if (err) done(err);
        done(null, data);
    });
};

const findEditThenSave = async (personId, done) => {
    const foodToAdd = "hamburger";

    const person = await Person.findById(personId)
    await person.favoriteFoods.push(foodToAdd);
    await person.save((err, data) => {
        if (err) done(err);
        done(null, data);
    });
};

const findAndUpdate = async (personName, done) => {
    const ageToSet = 20;

    const person = await Person.findOne({ name: personName });
    person.age = ageToSet;
    await person.save((err, data) => {
        if (err) done(err);
        done(null, data);
    });
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) => {
        if (err) done(err);
        done(null, data);
    });
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    Person.remove({ name: nameToRemove }, (err, data) => {
        if (err) done(err);
        done(null, data);
    })
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select('-age').exec(done);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
