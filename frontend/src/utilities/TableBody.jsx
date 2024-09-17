import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import dayjs from "dayjs";
import { useState, useEffect, Fragment } from "react";
import API from "../services/API";
import { useDispatch } from "react-redux";
import { setTaskRefresh } from "../redux/task/taskSlice";
import Notify from "./Toasts";

const TableRowComponent = ({ task, columns }) => {
  const dispatch = useDispatch();
  // const [update, setUpdate] = useState(false);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setUpdate((prev) => !prev);
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, [task]);

  const handleChange = async (e) => {
    const data = await API.updateTask(`/tasks/${task._id}`, {
      completed: e.target.checked,
    });
    if (data.success) {
      dispatch(setTaskRefresh());
      Notify("success", "Updated successfully");
    } else Notify("error", data.message);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={task._id}>
      {columns.map((column) => {
        let value;
        if (column.id === "createdAt")
          value = dayjs(task[column.id]).format("DD-MM-YYYY");
        else if (column.id === "completed") value = task[column.id].toString();
        else if (column.id === "remaningTime") {
          const crntDate = dayjs(Date.now());
          const trgtDate = dayjs(task.targetDateTime);
          const minutes = trgtDate.diff(crntDate, "minute");
          const seconds = trgtDate.diff(crntDate, "second");
          if (task.completed) value = "completed";
          else if (Number(minutes) < 0 || Number(seconds) < 0)
            value = "overdue";
          else
            value = `${Math.floor(minutes / 60)}:${minutes % 60}:${
              seconds % 60
            }`;
        } else value = task[column.id];

        let clr = "";

        if (column.id === "title") value = value.slice(0, 10);

        if (value === "overdue") clr = "red";
        else if (value === "completed") clr = "green";
        else if (value === "true") clr = "green";
        else if (value === "Low") clr = "green";
        else if (value === "Moderate") clr = "#fba004";
        else if (value === "High") clr = "#f33417";
        else clr = "black";
        return (
          <TableCell
            sx={{
              color: `${clr}`,
              fontWeight: `${
                column.id === "title" || value === "completed"
                  ? "bold "
                  : "normal"
              }`,
              letterSpacing: `${column.id === "title" ? "1px" : ".5px"}`,
              backgroundColor: "#ffe3e0",
            }}
            key={column.id}
            align={column.align}
          >
            {column.id === "completed" && (
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                defaultChecked={task.completed}
                onChange={handleChange}
              />
            )}
            {column.id === "remaningTime" ? <Time {...{ task }} /> : value}
            {/* {value} */}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export const Time = ({ task }) => {
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setUpdate((prev) => !prev);
    }, 1000);
    return () => clearInterval(id);
  }, [task]);

  let value;
  const crntDate = dayjs(Date.now());
  const trgtDate = dayjs(task.targetDateTime);
  const minutes = trgtDate.diff(crntDate, "minute");
  const seconds = trgtDate.diff(crntDate, "second");
  let hour = Number(Math.floor(minutes / 60));
  let min = Number(Math.floor(minutes % 60));
  let sec = Number(Math.floor(seconds % 60));
  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  if (task.completed) value = "completed";
  else if (Number(minutes) < 0 || Number(seconds) < 0) value = "overdue";
  else value = `${hour}:${min}:${sec}`;

  return <Fragment key={update}>{value}</Fragment>;
};

export default TableRowComponent;
