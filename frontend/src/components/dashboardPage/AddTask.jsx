import DateTimePickerCustom from "../../utilities/DateTimePicker";
import BasicSelect from "../../utilities/Select";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import Loading from "../../utilities/Loading";
import Notify from "../../utilities/Toasts";
import API from "../../services/API";
import { useDispatch } from "react-redux";
import { fetchTask, setTaskRefresh } from "../../redux/task/taskSlice";

const AddTask = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs(new Date().toISOString()));
  const [priority, setPriority] = useState("Low");
  const titleRef = useRef(null);
  const desRef = useRef(null);

  const createTask = async (e) => {
    setLoading(true);
    e.preventDefault();
    const title = titleRef.current.value;
    if (title.length < 5) {
      setLoading(false);
      return Notify("error", "Title should have 6 character");
    }
    const bodyData = {
      title,
      targetDateTime: date.format(),
      description: desRef.current.value,
      priority,
    };

    const data = await API.newTask("/task/new", bodyData);
    if (data.success) {
      setLoading(false);
      Notify("success", "created successfully");
      dispatch(setTaskRefresh());
      dispatch(fetchTask("task/new"));
      setIsOpen(false);
    } else {
      setLoading(false);
      Notify("error", data.message);
    }
  };

  return (
    <div className="w-[90%] h-[100%] sm:w-[90%] sm:h-[90%] mx-auto scale-[.85] sm:scale-100  flex justify-center  sm:pt-5 ">
      <form
        onSubmit={createTask}
        className="w-auto sm:w-[720px] bg-[#f57e66]  border-t-[8px] border-b-[8px] border-l-[3px] border-r-[3px] shadow-slate-600 shadow-2xl border-[#75220f] flex flex-col gap-10 items-center px-10  rounded-2xl sm:pt-20 py-2 sm:py-0 "
      >
        <div className="md:grid md:grid-cols-2 md:gap-20  ">
          <div className="flex flex-col gap-4 ">
            <label
              className="text-2xl text-white font-bold tracking-wide"
              htmlFor="title"
            >
              Title *
            </label>
            <input
              ref={titleRef}
              type="text"
              className="w-72 px-4 h-14 text-2xl rounded-lg focus:outline-none border-t-2 border-b-2 border-l-4 border-r-4 border-[#762311] font-bold tracking-wide"
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <label className="text-2xl text-white font-bold tracking-wide">
              Target Date/Time
            </label>
            <DateTimePickerCustom Date={date} setDate={setDate} />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-2 gap-20">
          <div className="flex flex-col gap-2 ">
            <label className="text-2xl text-white font-bold tracking-wide">
              Priority
            </label>
            <BasicSelect priority={priority} setPriority={setPriority} />
          </div>

          <div className="flex flex-col gap-2 ">
            <label className="text-2xl text-white font-bold tracking-wide">
              Description
            </label>
            <textarea
              ref={desRef}
              className="w-72 h-24 p-4 text-xl rounded-lg focus:outline-none border-t-2 border-b-2 border-l-4 border-r-4 border-[#762311] font-bold tracking-wide "
              name=""
              id=""
            ></textarea>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center h-16">
            <Loading />
          </div>
        ) : (
          <button className="bg-gray-300 font-bold mt-8 tracking-wide text-orange-950  text-2xl py-3 px-10 w-fit mx-auto border-t-2 border-b-2 border-l-4 border-r-4 border-[#762311] hover:bg-gray-200 ">
            Create Task
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTask;
