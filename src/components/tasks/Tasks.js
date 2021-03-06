import React from "react";
import axios from "axios";
import TasksList from "./TasksList";
import TaskForm from "./TaskForm";
import { TASKS_SERVICE_URL } from "../../constants";


class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      userId: null,
      addTask: false
    };
    this.getTasks = this.getTasks.bind(this);
  }

  async getTasks(userId) {
    let tasks = [];

    if (userId) {
      const url = `${TASKS_SERVICE_URL}/${userId}`;
      const request = await axios.get(url);
      tasks = request.data;
      this.setState({
        tasks,
        addTask: false
      });
    }

    return tasks;
  }

  render() {
    let { userName, tasks, userId, addTask } = this.state;

    return (
      <div>
        <div className="Tasks">
          <div className="Tasks__container">
            <h2>Tasks</h2>
            <h4 id={"owner" + userId}>Owned by: {userName}</h4>

            <div className="Tasks__buttons">
              <button
                className="btn btn-primary"
                onClick={e => {
                  this.setState({
                    addTask: true
                  });
                }}
              >
                New Task
              </button>
            </div>
            <br />
            {addTask && (
              <div className="task__form">
                <TaskForm userId={userId} getTasks={this.getTasks} />
              </div>
            )}
            <br />
            <div className="Tasks__list">
              <TasksList
                userId={userId}
                tasks={tasks}
                getTasks={this.getTasks}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getTasks(this.state.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userId !== this.state.userId) {
      this.getTasks(this.state.userId);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userId !== prevState.userId) {
      return { userName: nextProps.userName, userId: nextProps.userId };
    } else return null;
  }
}

export default Tasks;
