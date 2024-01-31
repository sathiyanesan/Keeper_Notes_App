const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const { DataTypes, where, Op } = require("sequelize");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


//get all notes
app.get("/notes", async (req, res) => {
    const allNotes = await db.Notes.findAll();
    // console.log(allNotes);
    res.json(allNotes);
});

//Add a notes
app.post("/notes", async (req, res) => {
    const noteData = req.body;
    console.log(noteData);
    const addNotes = await db.Notes.create(noteData);
    res.json(addNotes.toJSON());
});


//Edit a note
app.put("/notes/:noteId", async (req, res) => {
    const id = req.params.noteId;
    const data = req.body;
    console.log(id);
    console.log(data);
    const updateNote = await db.Notes.update(
        data, {
        where: {
            id: id
        }
    });
    res.send("successfully Updated the record");
});


//Delete note
app.delete("/notes/:noteId", async (req, res) => {
    const id = req.params.noteId;
    console.log(id);
    const deleteNote = await db.Notes.destroy({
        where: {
            id: id
        }
    });
    res.sendStatus(200);
});

(async () => {
    await db.sequelize.sync({ alter: true });
})();

app.listen(5000, () => {
    console.log("Successfully started server on port 5000");
})