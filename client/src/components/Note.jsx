import React, { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import EditNoteDialog from "./EditNote";

function Note(props) {
  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  return (
    <Fragment>
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <EditNoteDialog id={props.id} title={props.title} content={props.content} />
        <button onClick={handleDeleteClick}>
          <DeleteIcon />
        </button>
      </div>
    </Fragment>

  );
}

export default Note;








// function Note(props) {
//   function handleClick() {
//     props.onDelete(props.id);
//   }

//   return (
//     <div className="note">
//       <h1>{props.title}</h1>
//       <p>{props.content}</p>
//       <button onClick={handleClick}>
//         <DeleteIcon />
//       </button>
//     </div>
//   );
// }

// export default Note;