import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/API";
import dayjs from "dayjs";

const initialState = {
  value: [],
  isGetByMonth: false,
  key: false,
  remainingTasks: [],
};

export const fetchTask = createAsyncThunk(
  "task/fetchTask",
  async ({ endPoint, userId }) => {
    const data = await API.getTasks(endPoint);
    localStorage.removeItem(userId + endPoint);
    if (data.success) {
      localStorage.setItem(userId + endPoint, JSON.stringify(data.data));
    }
    return data.data;
  }
);

export const createTask = createAsyncThunk("task/createTask", async () => {});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: function (state, { payload }) {
      const remainingTasks = [];
      payload.forEach((task) => {
        const date2 = dayjs(task.targetDateTime);
        const date1 = dayjs(Date.now());
        const minutes = date2.diff(date1, "minute");

        if (!task.completed && Number(minutes) > 0) remainingTasks.push(task);
      });

      state.remainingTasks = remainingTasks;
      state.value = payload;
    },
    setIsGetByMonth: function (state, { payload }) {
      state.isGetByMonth = payload;
    },
    setTaskRefresh: function (state) {
      state.key = !state.key;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTask.fulfilled, (state, { payload }) => {
      if (payload && payload?.length) {
        state.value = payload;
        const remainingTasks = [];
        payload.forEach((task) => {
          const date2 = dayjs(task.targetDateTime);
          const date1 = dayjs(Date.now());
          const minutes = date2.diff(date1, "minute");

          if (!task.completed && Number(minutes) > 0) remainingTasks.push(task);
        });

        state.remainingTasks = remainingTasks;
      } else {
        state.value = [];
        state.remainingTasks = [];
      }
    });
  },
});

export const { setTasks, setIsGetByMonth, setTaskRefresh } = taskSlice.actions;

export default taskSlice.reducer;
