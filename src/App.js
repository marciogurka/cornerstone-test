import React, { Component } from 'react';
import './App.css';
import AppToolbar from './AppToolbar/AppToolbar';
import AppContent from './AppContent/AppContent';
import AppFooter from './AppFooter/AppFooter';

class App extends Component {
  render() {
    return (
      <div className='parent'>
        <AppToolbar/>
        <AppContent/>
        <AppFooter/>
      </div>
    );
  }
}

export default App;
