import React, { Component } from "react";
import axios from "axios";
import { TASKS_SERVICE_URL } from "../../constants";

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 0,
      description: "",
      taskId: null
    };
    this.displayDescriptionForm = this.displayDescriptionForm.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  displayDescriptionForm(event) {
    const taskId = event.target.getAttribute("data-task-id");
    const description = event.target.getAttribute("data-task-description");
    const td = document.getElementById(`description${taskId}`);

    this.setState({
      description
    });
    
    td.innerHTML = `
      <div>
        <input
          id="inputDescription${taskId}"
          name="description"
          type="text"
          value="${description}"
        />
        <button id="buttonDescription${taskId}" data-task-id=${taskId}>
          Ok
        </button>
      </div>
    `;

    document
      .getElementById(`buttonDescription${taskId}`)
      .addEventListener("click", this.updateDescription);
    document
      .getElementById(`inputDescription${taskId}`)
      .addEventListener("change", this.handleChangeDescription);

  }

  handleChangeState(event) {
    const selectedIndex = event.target.options.selectedIndex;
    const taskId = event.target.options[selectedIndex].getAttribute(
      "data-task-id"
    );

    this.setState(
      {
        state: event.target.value,
        taskId: taskId
      },
      () => {
        this.updateTask(this.props.userId, taskId, "state");
      }
    );
  }

  handleChangeDescription(event) {    
    const target = event.target;
    const value = target.value;

    this.setState({
      description: value
    });
  }

  updateDescription(event) {
    const taskId = event.target.getAttribute("data-task-id");

    this.setState(
      {
        taskId: taskId
      },
      () => {
        this.updateTask(this.props.userId, taskId, "description");
      }
    );
  }

  async updateTask(userId, taskId, attribute) {
    let data;
    if (attribute === "description") {
      data = {
        description: this.state.description
      };
    } else {
      data = {
        state: parseInt(this.state.state)
      };
    }

    try {
      await axios.put(`${TASKS_SERVICE_URL}/${taskId}`, data);
      alert("Task updated!");
      this.setState({
        state: 0,
        description: "",
        taskId: null
      });
      this.props.getTasks(userId);
    } catch (error) {
      error.response ? alert(error.response.data.message) : alert(error);
    }
  }

  async deleteTask(event) {
    const taskId = event.target.getAttribute("data-task-id");
    const userId = this.props.userId;

    try {
      await axios.delete(`${TASKS_SERVICE_URL}/${taskId}`);
      alert("Task deleted");
      this.props.getTasks(userId);
    } catch (error) {
      error.response ? alert(error.response.data.message) : alert(error);
    }
  }

  render() {
    let tasks = this.props.tasks;

    return (
      <div>
        <table id="usersTable">
          <thead>
            <tr>
              <th>Description</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => {
              const taskState = task.state === "done" ? 1 : 0;

              const taskDescriptionId = `description${task.id}`
              return (
                <tr key={task.id}>
                  <td id={taskDescriptionId}>{task.description}</td>
                  <td>
                    <select value={taskState} onChange={this.handleChangeState}>
                      <option value="0" data-task-id={task.id}>
                        To do
                      </option>
                      <option value="1" data-task-id={task.id}>
                        Done
                      </option>
                    </select>
                  </td>
                  <td>
                    <button
                      data-task-id={task.id}
                      data-task-description={task.description}
                      onClick={this.displayDescriptionForm}
                    >
                      update
                    </button>
                    <button data-task-id={task.id} onClick={this.deleteTask}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
