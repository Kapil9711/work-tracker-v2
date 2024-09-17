import styled from "styled-components";
import { useContext, useState } from "react";
import { ThemeContext } from "../../page/DashboardPage";
import Modal from "../../utilities/Modal";
import AddTask from "./AddTask";
import { useSelector } from "react-redux";
import AddEvent from "./AddEvent";

const DashHeader = styled.nav`
  width: min(100%, 1500px);
  margin-inline: auto;
  @media (min-height: 840px) {
    margin-top: 70px;
  }
  @media (min-height: 940px) {
    margin-top: 90px;
  }
`;

const DashboardHeader = () => {
  const { theme, width, height } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const remainingTasks = useSelector((state) => state.task.remainingTasks);
  // console.log(remainingTasks);
  return (
    <DashHeader
      className={`flex relative justify-between items-center px-4 sm:px-0 
         mt-5
       `}
    >
      <div>
        <h1
          className={`text-xl text-white  ${
            width > 1500 ? "sm:text-4xl" : "sm:text-3xl"
          }  font-bold tracking-wide`}
        >
          My Calendar
        </h1>

        <p className=" hidden sm:block text-gray-100 xl:mt-2">
          information designed to accurate insights
        </p>
      </div>
      <p className=" hidden lg:block absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-xl bg-[#f66b4c] py-2 px-4 rounded-full">
        {remainingTasks?.length
          ? `You have ${remainingTasks.length} Tasks To Do`
          : "No Task Remaining"}
      </p>

      <button
        onClick={() => {
          // if (width < 1100) return;
          setIsOpen(true);
        }}
        className={`text-xl  text-white py-3 px-6 ${
          width > 1500 && "xl:py-6 xl:px-12"
        } rounded-full   ${
          theme.light
            ? "bg-orange-800 hover:bg-orange-600"
            : "bg-[#f46645] hover:bg-orange-500"
        }`}
      >
        + Add Task
      </button>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>{<AddTask setIsOpen={setIsOpen} />}</Modal>
      )}
    </DashHeader>
  );
};

export default DashboardHeader;
