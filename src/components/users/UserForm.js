import React, { Component } from "react";
import axios from "axios";
import { USERS_SERVICE_URL } from "../../constants";
import { InputGroup, FormControl } from "react-bootstrap";



export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postUser = this.postUser.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      userName: value
    });
  }

  async postUser() {
    if (this.state.userName === '') {
      alert("Name can't be blank")
    } else {
      const data = {
        name: this.state.userName,
      };
  
      try {
        await axios.post(USERS_SERVICE_URL, data);
        alert('User created!')
        this.props.getUsers();
        document.getElementById("create-user-form").reset();
        this.setState({ form: {} });
      } catch (error) {
        error.response ? alert(error.response.data.message) : alert(error);
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postUser()
    event.target.reset();
  }

  render() {
    return (
      <form id="create-user-form" onSubmit={this.handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Name
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="name"
            type="text"
            value={this.state.userName || ""}
            onChange={this.handleChange}
          />
        </InputGroup>
        <button className="btn btn-success" type="submit" value="Submit">
          Add User
        </button>
      </form>
    );
  }
}
