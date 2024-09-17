import styled from "styled-components";
import Calendar from "../../../utilities/Calendar";
import { useContext, useState, lazy } from "react";
import { ThemeContext } from "../../../page/DashboardPage";
import getDateAndDay from "../../../utilities/getDateandDay";
import { useGSAP } from "@gsap/react";
import gsap, { Expo } from "gsap";
import dayjs from "dayjs";
import CustomTable from "../../../utilities/Table";
import { useSelector } from "react-redux";
import EventsBox from "./EventsBox";
import getDay from "../../../utilities/getDay";
import { TaskMobile } from "./Task-Mobile";

const MainWrapper = styled.main`
  width: min(100%, 1500px);
  margin-inline: auto;
  display: grid;

  @media (min-height: 840px) {
    margin-top: 70px;
  }

  @media (min-height: 940px) {
    margin-top: 90px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 2fr;
    .cal {
      margin-inline: 0;
    }
  }
`;

const TastShow = styled.div`
  background-color: ${({ theme }) => {
    return theme.match;
  }};
`;

const Main = () => {
  const { theme, height, width } = useContext(ThemeContext);
  const tasks = useSelector((state) => state.task.value);
  const [value, setValue] = useState(dayjs(new Date()));

  useGSAP(() => {
    gsap.from(".box", {
      duration: 2,
      height: 0,
      ease: Expo.easeInOut,
      stagger: 0.5,
    });
  });

  return (
    <MainWrapper className={` mt-10   gap-8 xl:gap-0`}>
      <div className="mx-auto cal  grid gap-4">
        <Calendar value={value} setValue={setValue} />
        <EventsBox />
      </div>
      <TastShow
        theme={theme}
        className={`h-screen sm:h-[500px]   rounded-[28px] overflow-hidden`}
      >
        <section className="mt-2 px-5 flex justify-between items-center relative">
          <h1 className="text-white font-bold sm:tracking-wide text-xs sm:text-2xl ">
            {getDateAndDay(value)}
          </h1>

          <p className="tracking-wide text-sm sm:text-xl  font-bold text-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            Tasks-{tasks.length}
          </p>
          <p className="text-xs sm:text-2xl font-bold tracking-wide text-white">
            {" "}
            {getDay(value.day())}
          </p>
        </section>
        <div
          style={{ scrollbarWidth: "none" }}
          className={`box   mt-4  h-full   rounded-[28px] bg-[#f3a69b] `}
        >
          <TaskMobile {...{ tasks, setValue, width, theme, value }} />
          <CustomTable {...{ tasks, setValue, width, theme, value }} />
        </div>
      </TastShow>
    </MainWrapper>
  );
};

export default Main;
