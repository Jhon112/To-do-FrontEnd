import React from 'react';
import axios from "axios";
import Users from "./components/users/Users";
import Tasks from "./components/tasks/Tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

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
    const url = 'http://ec2-18-232-100-104.compute-1.amazonaws.com/status';
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
        <Container>
          <Row>
            <Col>
              <div className="User__component">
                {statusAPiUsers === "OK" && (
                  <Users
                    showTasks={this.showTasks}
                    statusApi={statusAPiUsers}
                  />
                )}
              </div>
            </Col>
            <Col>
              {showTasksList && (
                <div className="Tasks__component">
                  <Tasks userName={userName} userId={userId} />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  componentDidMount() {
    this.getstatusApiUsers();
  }
}

export default App;
