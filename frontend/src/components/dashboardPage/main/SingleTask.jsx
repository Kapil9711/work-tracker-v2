import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setTaskRefresh } from "../../../redux/task/taskSlice";
import Notify from "../../../utilities/Toasts";
import API from "../../../services/API";

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  button {
    position: absolute;
    right: 8px;
    top: -8px;
    font-size: 40px;
    color: white;
  }

  ul {
    padding-block: 16px;
    padding-inline: 16px;
    background-color: white;
    height: 65%;
    width: 90%;
    border-radius: 12px;
    margin-block-start: 50px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      padding-block: 8px;
      padding-inline: 20px;
      background-color: #df583a;
      color: white;
      border-radius: 50px;
      font-weight: 600;

      input {
        margin-top: 12px;
        display: inline-block;
        height: 14px;
        width: 14px;
      }
      span {
        margin-right: 16px;
        text-transform: capitalize;
        font-size: 18px;
      }

      span:nth-child(1) {
        font-size: 22px;
      }
    }

    li:last-child {
      span:last-child {
        font-size: 14px;
      }
    }
  }
`;

export const SingleTask = ({ isShow, task }) => {
  console.log(task);
  const dispatch = useDispatch();
  const { title, completed, targetDateTime, description, priority } = task;
  const handleChange = async (e) => {
    const data = await API.updateTask(`/tasks/${task._id}`, {
      completed: e.target.checked,
    });
    if (data.success) {
      dispatch(setTaskRefresh());
      Notify("success", "Updated successfully");
      isShow(false);
    } else Notify("error", data.message);
  };
  return (
    <StyledSection onClick={() => isShow(false)}>
      <button>X</button>
      <ul onClick={(e) => e.stopPropagation()}>
        <li>
          <span>Title</span>
          <span>-</span>
          <span>{title}</span>
        </li>
        <li>
          <span>Completed</span>
          <span>-</span>
          <span>{completed.toString()}</span>
          <input
            type="checkbox"
            defaultChecked={task.completed}
            onChange={handleChange}
          />
        </li>
        <li>
          <span>TargetTime</span>
          <span>-</span>
          <span></span> {new dayjs(targetDateTime).format("h-mm A")}
        </li>
        <li>
          <span>Priority</span>
          <span>-</span>
          {priority}
        </li>
        <li>
          <span>description</span>
          <span>-</span>
          <span>
            {description.trim().length ? description : "No Description Found"}
          </span>
        </li>
      </ul>
    </StyledSection>
  );
};
