import React from "react";
import UsersList from "../components/UsersList"

class Users extends React.Component {
  state = {
    data: [
      {
        id: "22xasxasx",
        name: "Jhon"
      },
      {
        id: "22x551",
        name: "Rubiela",
      },
      {
        id: "22x96633",
        name: "Diego",
      }
    ]
  };


  render() {
    let { data } = this.state;

    return (
      <div>
        <div className="Users">
          <div className="Users__container">
            <div className="Users__buttons">
              <a className="btn btn-primary" href="/Users/new">
                New User
              </a>
            </div>

            <div className="Users__list">
              <UsersList users={data} showTasks={this.props.showTasks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
