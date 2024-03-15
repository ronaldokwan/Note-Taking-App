import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote, updateArchived, fetchNotes } from "../store/noteSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const deleteItem = (id) => {
    dispatch(deleteNote(id));
  };

  const archiveItem = (id) => {
    dispatch(updateArchived(id, { archived: true }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>My Notes</h1>
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>Tag: {note.tag}</p>
            <div className="button-group">
              <button
                className="btn btn-danger"
                onClick={() => deleteItem(note.id)}
              >
                Delete
              </button>
              <Link to={`/edit-note/${note.id}`} className="btn btn-primary">
                Edit
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => archiveItem(note.id)}
              >
                Archive
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
