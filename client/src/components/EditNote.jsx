import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';


export default function EditNoteDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [editedNote, setEditedNote] = React.useState({
        title: props.title,
        description: props.content
    });

    const updateNote = async () => {
        const body = editedNote;
        console.log(body);
        const response = await fetch(`http://localhost:5000/notes/${props.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        setOpen(false);
        window.location = "/";
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleEditChange(event) {
        const { name, value } = event.target;

        setEditedNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }
    //variant="outlined"
    return (
        <React.Fragment>
            <button className="note-edit-dialog" onClick={handleClickOpen}>
                <EditIcon />
            </button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Note</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Edit the note
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        id="name"
                        placeholder="Edit Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedNote.title}
                        onChange={handleEditChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="standard-multiline-static"
                        name="description"
                        placeholder="Edit Description ..."
                        type="text"
                        fullWidth
                        multiline
                        maxRows={4}
                        variant="standard"
                        value={editedNote.description}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateNote}>Save Changes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}