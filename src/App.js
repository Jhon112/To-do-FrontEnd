import React from 'react';
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: null, showTasksList: false };
    this.showTasks = this.showTasks.bind(this)
  }

  showTasks = userId => {
    this.setState({
      userId,
      showTasksList: true
    });
  };

  render() {
    const { userId, showTasksList } = this.state;

    return (
      <div className="App">
        <div className="User__component">
          <Users showTasks={this.showTasks} />
        </div>

        {showTasksList && (
          <div className="Tasks__component">
            <Tasks userId={userId} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
