import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote, updateArchived, fetchArchived } from "../store/noteSlice";

const Archived = () => {
  const dispatch = useDispatch();
  const { archived, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchArchived());
  }, [dispatch]);

  const deleteItem = (id) => {
    dispatch(deleteNote(id, { archived: true }));
  };

  const archiveItem = (id) => {
    dispatch(updateArchived(id, { archived: false }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>My Archived</h1>
      <ul className="note-list">
        {archived.map((note) => (
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
              <Link to={`/update-note/${note.id}`} className="btn btn-primary">
                Update
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => archiveItem(note.id)}
              >
                Unarchive
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Archived;
