import styled from "styled-components";
import dayjs from "dayjs";
import { useState } from "react";
import Modal from "../../../utilities/Modal";
import { SingleTask } from "./SingleTask";
import { Time } from "../../../utilities/TableBody";

const StyledSection = styled.section`
  height: 100%;
  width: 100%;
  position: relative;

  header {
    height: 40px;
    width: 100%;
    background-color: hsl(11, 72%, 55%);
  }

  .main-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #fdfbfb;
    height: 100%;
    overflow: auto;
    padding-block-end: 100px;
    padding-block-start: 8px;
    padding-inline: 4px;

    h2 {
      padding-block-start: 100px;
      text-align: center;
      font-weight: bold;
    }

    & > li {
      border: 1px solid white;
      padding-block: 12px;
      padding-inline: 4px;
      transition: background-color 1s ease, color 0.5s ease;
      border: 1px solid white;
      border-radius: 50px;
      background-color: hsl(7, 91%, 87%);

      &:hover {
        background-color: #f95b46;
        color: white;
      }
    }

    & > li ul {
      display: flex;
      justify-content: space-between;
      padding-inline: 8px;

      li {
        text-align: left;
        cursor: pointer;
        font-weight: 600;
        text-align: left;
        flex: 1;
        font-size: 12px;

        &:hover {
          font-weight: 700;
        }
      }

      & li:nth-child(1) {
        text-align: left;
        flex: 2;
        font-size: 15px;
      }

      & li:nth-child(3) {
        text-align: center;
      }

      & li:last-child {
        text-align: right;
      }
    }
  }

  @media (min-width: 840px) {
    display: none;
  }
`;

export const TaskMobile = ({ tasks, setValue, width, theme, value }) => {
  return (
    <StyledSection>
      <header></header>
      <MobileTaskList {...{ tasks }} />
    </StyledSection>
  );
};

const MobileTaskList = ({ tasks }) => {
  console.log(tasks);
  const [showSingleTask, setShowSingleTask] = useState(false);
  const [singleTask, setSingleTask] = useState({});

  return (
    <ul className="main-list my-container">
      {showSingleTask && (
        <SingleTask isShow={setShowSingleTask} task={singleTask} />
      )}
      {!tasks.length && <h2>No Task Found</h2>}
      {tasks?.map((task, i) => {
        return (
          <>
            <li
              onClick={() => {
                setSingleTask(task);
                setShowSingleTask(true);
              }}
              key={task._id}
            >
              <ul>
                <li>
                  {i + 1}. {task.title.slice(0, 12)}
                </li>
                <li>
                  <Time task={task} />
                </li>
                <li>{task.priority}</li>
                <li>{task.completed.toString()}</li>
              </ul>
            </li>
          </>
        );
      })}
    </ul>
  );
};
