import React, { Component } from 'react';
import './component_css/committments.css';

class Committments extends Component {
  constructor(props){
    super(props);
    this.state = {
      committments: [
        <li>Hit the gym</li>,
        <li class="checked">Pay bills</li>,
        <li>Meet George</li>,
        <li>Buy eggs</li>,
        <li>Read a book</li>,
        <li>Organize office</li>]
    };
  }

  render() {
    return (
      <div className="Your Committments">
        <div id="myDIV" class="header">
          <h2>Committments</h2>
            <input type="text" id="myInput" placeholder="Title..."/>
            <span onclick="newElement()" class="addBtn">Add</span>
        </div>
        <ul id="myUL">
          {this.state.committments}
        </ul>
      </div>
    );
  }
}

export default Committments;
