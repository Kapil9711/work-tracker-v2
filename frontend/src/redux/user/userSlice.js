import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/API";

const protocol = location.protocol;
let uri = `/api/v1/image`;

console.log(protocol, uri);

const initialState = {
  value: {},
  image: uri,
  isLogout: false,
  id: "",
  key: 0,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const data = await API.getUserProfile();
  return data.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: function (state, { payload }) {
      state.value = payload;
    },
    refreshProfileImage: function (state) {
      state.image = uri;
      state.key += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.value = payload;
      state.id = payload._id;
    });
  },
});

export const { setUser, refreshProfileImage, setIsLogout } = userSlice.actions;

export default userSlice.reducer;
