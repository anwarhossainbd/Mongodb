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
    lastName: String,
    dob: Date,
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: [String],
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
    const student = new Student({
        firstName: "Moinul",
        lastName: "Islam",
        dob: new Date("27 April 1995"),
        passed: true,
        hobbies: ["Swimming", "Singing"],
        parents: {
            father: "A",
            mother: "B",
        },
        subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 90 }],
    });

    try {
        const data = await student.save();
        console.log(data);
    } catch (err) {
        console.log(err._message);
    }
}

//createStudent();

// R => Read
async function readStudents() {
    const studentsData = await Student
        .find()
        .limit(1)
        .sort({ firstName: -1, lastName: 1 })
        .select({ firstName: 1, lastName: 1, hobbies: 1 });
    console.log(studentsData);
}

readStudents();