import React, { Component } from 'react';
import logo from './logo.svg';
import Contact from './component/contact.component.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="FlexRow bottom-half">
        <div className="navigation-bar"></div>
        <div className="ContactList">
        <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'haiwen@stanford.edu'} name={'J L'} />
        <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'hgui@stanford.edu'} name={'kkiu'} />
        <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'g@stanford.edu'} name={'Mg'} />
        <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'g@stanford.edu'} name={'Hgu'} />
        <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'k@stanford.edu'} name={'Na'} />
        <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'ku@stanford.edu'} name={'Og'} />
        <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'ku@stanford.edu'} name={'Og'} />
        </div>
      </div>
      </div>
    );
  }
}

export default App;
