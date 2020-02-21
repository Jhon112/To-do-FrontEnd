import React, { Component } from "react";

export default class UsersList extends Component {

  render() {
    let users  = this.props.users;

    return (
      <div>
        <table id="usersTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Tasks</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>
                    <button
                      onClick={e =>
                        this.props.showTasks(user.id)
                      }
                    >
                      Tasks
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