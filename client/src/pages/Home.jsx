import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote, updateArchived, fetchNotes } from "../store/noteSlice";
import AnimeApi from "../components/AnimeApi";
import TriviaApi from "../components/TriviaApi";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState("All");
  const notesPerPage = 3;

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          !note.archived &&
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedTag === "All" || note.tag === selectedTag)
      )
    );
  }, [notes, searchTerm, selectedTag]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id, { archived: false }));
  };

  const handleArchive = (id) => {
    dispatch(updateArchived(id, { archived: true }));
  };

  const handleTagFilter = (e) => {
    setSelectedTag(e.target.value);
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">My Notes</h1>
        <div className="api-container">
          <div className="api-box">
            <h2 className="api-heading">Anime Gif</h2>
            <AnimeApi />
          </div>
          <div className="api-box">
            <h2 className="api-heading">Trivia</h2>
            <TriviaApi />
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="notes-container">
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedTag}
              onChange={handleTagFilter}
              className="filter-select"
            >
              <option value="All">All Tags</option>
              {[
                ...new Set(
                  notes.filter((note) => !note.archived).map((note) => note.tag)
                ),
              ].map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <ul className="note-list">
            {currentNotes.map((note) => (
              <li key={note.id} className="note-item">
                <h2 className="note-title">{note.title}</h2>
                <p className="note-content">{note.content}</p>
                <p className="note-tag">Tag: {note.tag}</p>
                <div className="button-group">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update-note/${note.id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleArchive(note.id)}
                  >
                    Archive
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination-container">
            {Array(Math.ceil(filteredNotes.length / notesPerPage))
              .fill()
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`pagination-btn ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
