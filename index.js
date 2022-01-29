const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-students', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB Successfully!"))
    .catch(err => console.error("Connection Failed!!"));

// Schema -> Defines the shape documents
const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String, required: [true, "Please insert lastname"] },
    dob: {
        type: Date, validate: {
            validator: (value) => value > new Date("1 January 2000"),
            message: "Date must be after 1 January 2000"
        }
    },
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: {
        type: Array,
        of: String,
        validate: {
            validator: (value) => value.length > 0,
            message: "There must be at least 1 hobby!"
        }
    },
    parents: {
        father: String,
        mother: String,
    },
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
});

// Model
const Student = mongoose.model('Student', studentSchema); // Class

// C => Create
async function createStudent() {
    try {
        const data = await Student.create({
            firstName: "Simanta",
            //lastName: "Paul",
            dob: new Date("27 April 1994"),
            passed: true,
            hobbies: [],
            parents: {
                father: "A",
                mother: "B",
            },
            subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 90 }],
        });
        console.log(data);
    } catch (err) {
        console.log(err.message);
    }
}

createStudent();