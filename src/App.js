import React, { Component } from 'react';
import './App.css';
import AppToolbar from './AppToolbar/AppToolbar';
import AppContent from './AppContent/AppContent';

class App extends Component {
  render() {
    return (
      <div className='parent'>
        <AppToolbar/>
        <AppContent/>
      </div>
    );
  }
}

export default App;
