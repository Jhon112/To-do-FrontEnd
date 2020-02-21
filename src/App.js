import React from 'react';
import axios from "axios";
import Users from "./components/users/Users";
import Tasks from "./components/tasks/Tasks";
import { USERS_SERVICE_URL } from "./constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:null,
      userId: null,
      showTasksList: false,
      statusAPiUsers: ""
    };
    this.showTasks = this.showTasks.bind(this);
    this.getstatusApiUsers = this.getstatusApiUsers.bind(this);
  }

  showTasks = (userName, userId) => {
    this.setState({
      userName,
      userId,
      showTasksList: true
    });
  };

  async getstatusApiUsers() {
    const url = `${USERS_SERVICE_URL}/status`;
    const response = await axios.get(url);
    const status = response.data.status;
    this.setState({
      statusAPiUsers: status
    });
  }

  render() {
    const { userName, userId, showTasksList, statusAPiUsers } = this.state;

    return (
      <div className="App">
        <div className="User__component">
          {statusAPiUsers === "OK" && (
            <Users showTasks={this.showTasks} statusApi={statusAPiUsers} />
          )}
        </div>

        

        {showTasksList && (
          <div className="Tasks__component">
            <Tasks userName={userName} userId={userId} />
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.getstatusApiUsers();
  }
}

export default App;
