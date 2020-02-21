import React, { Component } from "react";
import axios from "axios";
import { USERS_SERVICE_URL } from "../../constants";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userId: null
    };
    this.displayUserForm = this.displayUserForm.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }


    displayUserForm(event) {
    const userId = event.target.getAttribute("data-user-id");
    const name = event.target.getAttribute("data-user-name");
    const td = document.getElementById(`name${userId}`);

    this.setState({
      name
    });
    
    td.innerHTML = `
      <div>
        <input
          id="inputName${userId}"
          name="name"
          type="text"
          value="${name}"
        />
        <button id="buttonName${userId}" data-user-id=${userId}>
          Ok
        </button>
      </div>
    `;

    document
      .getElementById(`buttonName${userId}`)
      .addEventListener("click", this.updateName);
    document
      .getElementById(`inputName${userId}`)
      .addEventListener("change", this.handleChangeName);

  }

  handleChangeName(event) {    
    const target = event.target;
    const value = target.value;

    this.setState({
      name: value
    });
  }

  updateName(event) {
    const userId = event.target.getAttribute("data-user-id");

    this.setState(
      {
        userId: userId
      },
      () => {
        this.updateUser(userId);
      }
    );
  }

  async updateUser(userId) {
    let data;
    data = {
      name: this.state.name
    };


    try {
      await axios.put(`${USERS_SERVICE_URL}/users/${userId}`, data);
      alert("User updated!");
      this.setState({
        state: 0,
        name: "",
        userId: null
      });
      this.props.getUsers(userId);
      const owner = document.getElementById(`owner${userId}`)
      if (owner) owner.innerHTML = `${data.name}`
    } catch (error) {
      error.response ? alert(error.response.data.message) : alert(error);
    }
  }

  async deleteUser(event) {
    const userId = event.target.getAttribute("data-user-id");

    try {
      await axios.delete(`${USERS_SERVICE_URL}/users/${userId}`);
      alert("User deleted");
      this.props.getUsers(userId);
    } catch (error) {
      error.response ? alert(error.response.data.message) : alert(error);
    }
  }

  render() {
    let users  = this.props.users;    

    return (
      <div>
        <table id="usersTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const userNameId = `name${user.id}`;

              return (
                <tr key={user.id}>
                  <td id={userNameId}>{user.name}</td>
                  <td>
                    <button
                      onClick={e => this.props.showTasks(user.name, user.id)}
                    >
                      Tasks
                    </button>
                  </td>
                  <td>
                    <button
                      data-user-id={user.id}
                      data-user-name={user.name}
                      onClick={this.displayUserForm}
                    >
                      update
                    </button>
                    <button data-user-id={user.id} onClick={this.deleteUser}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ul></ul>
      </div>
    );
  }
}