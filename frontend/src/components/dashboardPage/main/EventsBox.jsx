import { useSelector } from "react-redux";

const EventsBox = () => {
  const remainingTasks = useSelector((state) => state.task.remainingTasks);
  return (
    <div className="border-2 h-32 w-80 rounded-[28px] bg-gray-50">
      <span className="mx-auto block w-fit text-lg font-bold ">
        Tasks Alert
      </span>
      <span className="block mx-auto w-fit text-lg font-bold">
        You have {remainingTasks.length || "No"} tasks To Do
      </span>
      {remainingTasks.length ? (
        <span className="mt-2 py-2 px-4 bg-[#f67d65] rounded-full block text-white     font-bold mx-auto w-fit text-xl">
          expiring soon {remainingTasks[0]?.title.slice(0, 12)}
        </span>
      ) : (
        <span className="mt-2 block mx-auto w-fit text-2xl">
          Enjoy Your day 🤩
        </span>
      )}
    </div>
  );
};

export default EventsBox;
