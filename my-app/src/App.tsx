import React from 'react';
import logo from './logo.svg';
import Stopwatch from './Stopwatch'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends React.Component<{}, {
  numberOfStopwatches: number;
}> {
  state = {
    numberOfStopwatches: 1
  }
  
  private addStopwatch = () => {
    this.setState({
      numberOfStopwatches: this.state.numberOfStopwatches + 1
    })
  }

  private removeStopwatch = () => {
    this.setState({
      //remove if more than 1 lap, otherwise minimum is 1 
      numberOfStopwatches: this.state.numberOfStopwatches > 1 ? this.state.numberOfStopwatches - 1 : 1 
    })
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={this.addStopwatch}>+</button> <button onClick={this.removeStopwatch}>-</button>
          {
            //make an empty array whose length is based on numberOfStopwatches and fill it with anything
            //I don't care about the stopwatch value, rather its index number
            Array(this.state.numberOfStopwatches).fill(0).map((value: any, i:number) => {
              return <Stopwatch key={i} /> //key is ith index
            })
          }
        </header>
      </div>
    );  
  }
}

export default App;
