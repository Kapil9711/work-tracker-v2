import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableRowComponent from "./TableBody";
import FilterSelect from "./filters/FilterSelect";
import SortSelect from "./filters/SortSelect";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Notify from "./Toasts";
import getMonth from "./getMonth";

const columns = [
  { id: "createdAt", label: "CreatedAt", minWidth: 170 },
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "remaningTime",
    label: "RemainingTime",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "priority",
    label: "periority",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "completed",
    label: "Completed",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
];

export default function CustomTable({ tasks, setValue, width, theme, value }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [priorityobj, setPriorityobj] = React.useState({
    Low: [],
    Moderate: [],
    High: [],
  });
  const [filterBy, setFilterBy] = React.useState("Remaining");
  const [sortBy, setSortBy] = React.useState("High");
  const byMonth = useSelector((state) => state.task.isGetByMonth);
  const remain = useSelector((state) => state.task.remainingTasks);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    setPage(0);
    const low = [];
    const high = [];
    const mode = [];
    tasks?.forEach((task) => {
      if (task.priority === "Low") low.push(task);
      else if (task.priority === "Moderate") mode.push(task);
      else high.push(task);
    });
    setPriorityobj({
      Low: low,
      Moderate: mode,
      High: high,
    });
  }, [tasks]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let priorityTask;

  // applying sort
  if (sortBy === "Moderate")
    priorityTask = [
      ...priorityobj.Moderate,
      ...priorityobj.High,
      ...priorityobj.Low,
    ];
  else if (sortBy === "Low") {
    priorityTask = [
      ...priorityobj.Low,
      ...priorityobj.Moderate,
      ...priorityobj.High,
    ];
  } else if (sortBy === "High") {
    priorityTask = [
      ...priorityobj.High,
      ...priorityobj.Moderate,
      ...priorityobj.Low,
    ];
  } else priorityTask = tasks;

  //handle filter
  if (filterBy !== "None") {
    if (filterBy === "Remaining") {
      if (remain.length === 0 && priorityTask.length) {
        setFilterBy("None");
      } else priorityTask = [...remain];
    } else if (filterBy === "Completed") {
      const comp = [];
      priorityTask.forEach((task) => {
        if (task.completed) comp.push(task);
      });
      priorityTask = [...comp];
    } else priorityTask = [...priorityobj[filterBy]];
  }

  return (
    <Paper
      className="hidden md:block"
      sx={{ width: "100%", height: "100%", scrollbarWidth: "none" }}
    >
      <TableContainer
        sx={{
          maxHeight: `${width > 550 ? "79%" : "87%"}`,
          minHeight: `${width > 550 ? "79%" : "87%"}`,
          scrollbarWidth: "none",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={2}
                sx={{
                  background: `${theme.light ? "#f3a599" : "#df583a"}`,
                  color: `${theme.light ? "black" : "white"}`,
                }}
              >
                {/* custom component */}
                <div className="flex items-center gap-2">
                  <p>FilterBy </p>{" "}
                  <FilterSelect setPriority={setFilterBy} priority={filterBy} />
                </div>
              </TableCell>
              <TableCell
                sx={{
                  background: `${theme.light ? "#f3a599" : "#df583a"}`,
                  color: `${theme.light ? "black" : "white"}`,
                }}
                align="center"
                colSpan={2}
              >
                <div className="flex items-center gap-2 ml-4">
                  <p>sortBy</p>{" "}
                  <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
                </div>
              </TableCell>

              <TableCell
                sx={{
                  background: `${theme.light ? "#f3a599" : "#df583a"}`,
                  color: `${theme.light ? "black" : "white"}`,
                }}
                align="center"
                colSpan={2}
              >
                <div className="flex items-center gap-2 justify-start">
                  <button
                    className={`border-2  hover:bg-[#f9c0b7]
                     px-1`}
                    onClick={() =>
                      setValue((prev) =>
                        byMonth
                          ? prev.subtract(1, "month")
                          : prev.subtract(1, "day")
                      )
                    }
                  >
                    <KeyboardDoubleArrowLeftIcon />
                    prev
                  </button>
                  <p>{byMonth ? getMonth(value.month()) : value.date()}</p>
                  <button
                    className="border-2 hover:bg-[#f9c0b7]  px-1"
                    onClick={() =>
                      setValue((prev) =>
                        byMonth ? prev.add(1, "month") : prev.add(1, "day")
                      )
                    }
                  >
                    next
                    <KeyboardDoubleArrowRightIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    backgroundColor: "#ffe3e0",
                    color: "black",
                  }}
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody className="relative ">
            {priorityTask.length ? (
              priorityTask
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task) => {
                  return (
                    <TableRowComponent
                      theme={theme}
                      key={task._id}
                      task={task}
                      columns={columns}
                    />
                  );
                })
            ) : (
              <h1 className="absolute left-[20%] md:left-[50%] translate-x-[-50%] font-bold text-xl mt-20">
                No Task Found
              </h1>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          backgroundColor: `${theme.light ? "hsl(8, 79%, 78%)" : "#df583a"}`,
          color: `${theme.light ? "black" : "white"}`,
        }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={priorityTask.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
