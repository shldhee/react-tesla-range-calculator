import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TeslaBattery from './conatiner/TeslaBattery';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TeslaBattery />
      </div>
    );
  }
}

export default App;
