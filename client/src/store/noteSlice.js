import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    archived: [],
    loading: false,
    error: "",
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setArchived: (state, action) => {
      state.archived = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNotes, setArchived, setLoading, setError } =
  noteSlice.actions;

export const fetchNotes = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:3000/",
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    dispatch(setNotes(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchArchived = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:3000/archived",
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    dispatch(setArchived(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addNote = (body) => async (dispatch) => {
  try {
    await axios({
      method: "post",
      url: "http://localhost:3000/add-note",
      data: body,
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    dispatch(fetchNotes());
  } catch (error) {
    Swal.fire({
      title: error.response.data.message,
      icon: "error",
    });
  }
};

export const updateNote = (id, body) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/update-note/${id}`, body);
    dispatch(fetchNotes());
  } catch (error) {
    Swal.fire({
      title: error.response.data.message,
      icon: "error",
    });
  }
};

export const deleteNote = (id, body) => async (dispatch) => {
  try {
    await axios({
      method: "delete",
      url: `http://localhost:3000/delete-note/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    if (body.archived) {
      dispatch(fetchArchived());
    } else {
      dispatch(fetchNotes());
    }
  } catch (error) {
    Swal.fire({
      title: error.response.data.message,
      icon: "error",
    });
  }
};

export const updateArchived = (id, body) => async (dispatch) => {
  try {
    await axios({
      method: "patch",
      url: `http://localhost:3000/update-archived/${id}`,
      data: body,
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    if (body.archived) {
      dispatch(fetchNotes());
    } else {
      dispatch(fetchArchived());
    }
  } catch (error) {
    Swal.fire({
      title: error.response.data.message,
      icon: "error",
    });
  }
};

export default noteSlice.reducer;
