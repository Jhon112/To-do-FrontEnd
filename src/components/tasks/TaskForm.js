import React, { Component } from "react";
import axios from "axios";
import { TASKS_SERVICE_URL } from "../../constants";


export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {form: {}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postTask = this.postTask.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ 
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  }

  async postTask(userId) {
    const data = {
      ...this.state.form,
      user_id: userId,
      state: 0
    }

    try {
      await axios.post(TASKS_SERVICE_URL, data);
      alert('Task created!')
      this.props.getTasks(userId);
      document.getElementById("create-task-form").reset();
      this.setState({ form: {} });
    } catch (error) {
      alert(error.response.data.message);
    }

    
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postTask(this.props.userId)
    event.target.reset();
    
  }

  render() {
    return (
      <form id="create-task-form" onSubmit={this.handleSubmit}>
        <label>Description</label>
        <input
          name="description"
          type="text"
          value={this.state.form.description || ""}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit" value="Submit">Add Task</button>
      </form>
    );
  }
}
