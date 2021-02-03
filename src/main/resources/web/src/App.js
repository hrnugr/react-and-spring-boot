import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    isLoading: true,
    groups: [],
  };

  async componentDidMount() {
    await axios.get("/api/groups").then(res => {
      console.log(res.data);
      this.setState({groups: res.data,isLoading: false});
    }).catch(error => {
      console.log(error);
    });


  }

  render() {
      const {groups, isLoading} = this.state;
  
      if (isLoading) {
        return <p>Loading...</p>;
      }
  
      return (
        <div className="App">
          <header className="App-header">
            <div className="App-intro">
              <h2>Group List</h2>
              {groups.map(group =>
                <div key={group.id}>
                  {group.name}
                </div>
              )}
            </div>
          </header>
        </div>
      );
    }
  }
  

export default App;
