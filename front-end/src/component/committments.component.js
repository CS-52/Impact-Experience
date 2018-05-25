import React, { Component } from 'react';
import './component_css/committments.css';
import CommittmentItem from "./committmentItem.js";

class Committments extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      completedItems: []
    };
    this.addItem = this.addItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e){
    if (this._inputElement.value !== "") {
        var newItem = {
          text: this._inputElement.value,
          key: Date.now()
        };
        this.setState((prevState) => {
          return {
            items: prevState.items.concat(newItem)
          };
        });
        this._inputElement.value = "";
    }
      console.log(this.state.items);
      e.preventDefault();
  }

  checkItem(key) {
    this.setState((prevState) => {
      return {
        completedItems: prevState.completedItems.concat(
          this.state.items.filter(function (item) {
            return (item.key == key);
          })
        )
      };
    });
    console.log(this.state.completedItems);
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (
      <div className="Committments">
        <div id="myDIV" className="header">
        <form onSubmit = {this.addItem}>
          <h2>Committments</h2>
            <input ref={(a) => this._inputElement = a}
                  placeholder="Enter task">
            </input>
            <button className="addBtn" type="submit">Add</button>
        </form>
        </div>
        <ul id="myUL">
          <CommittmentItem entries={this.state.items}
                           check={this.checkItem}
                           delete={this.deleteItem}/>
        </ul>
      </div>
    );
  }
}

export default Committments;
