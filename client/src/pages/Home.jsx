import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote, updateArchived, fetchNotes } from "../store/noteSlice";
import AnimeApi from "../components/AnimeApi";
import TriviaApi from "../components/TriviaApi";
import "./HomePage.css"; // Import CSS file for styling

const HomePage = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const deleteItem = (id) => {
    dispatch(deleteNote(id, { archived: false }));
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
      <div className="header">
        <AnimeApi />
        <TriviaApi />
      </div>
      <h1 className="title">My Notes</h1>
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <h2 className="note-title">{note.title}</h2>
            <p className="note-content">{note.content}</p>
            <p className="note-tag">Tag: {note.tag}</p>
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
