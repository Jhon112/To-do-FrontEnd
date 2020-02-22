import React from "react";
import axios from 'axios'
import UsersList from "./UsersList"
import UserForm from "./UserForm";
import {USERS_SERVICE_URL} from '../../constants'

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addUser: false,
    };
    this.getUsers = this.getUsers.bind(this);
  }

  async getUsers() {
    let users = [];

    const request = await axios.get(USERS_SERVICE_URL);
    users = request.data;
    this.setState({
      users,
      addUser: false
    });

    return users;
  }

  render() {
    let { users, addUser } = this.state;

    return (
      <div>
        <div className="Users">
          <div className="Users__container">
            <h2>Users</h2>
            <div className="Users__buttons">
              <button
                className="btn btn-primary"
                onClick={e => {
                  this.setState({
                    addUser: true
                  });
                }}
              >
                New User
              </button>
            </div>
            <br />
            {addUser && (
              <div className="User__form">
                <UserForm getUsers={this.getUsers} />
              </div>
            )}

            <div className="Users__list">
              <UsersList
                users={users}
                showTasks={this.props.showTasks}
                getUsers={this.getUsers}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.statusApi === "OK") {
      this.getUsers();
    } else {
      alert('users api not working. Try later')
    }
  }
}

export default Users;
