import React, { Component } from "react";

class CommittmentItem extends Component {
  constructor(props) {
  super(props);
  this.createTasks = this.createTasks.bind(this);
}

  createTasks(item) {
    return <li onClick={() => this.check(item)}
              key={item.key}>{item.text} </li>
}
  check(item) {
    this.props.check(item.key);
    item.className += " checked";
  }

  delete(key) {
    this.props.delete(key);
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};

export default CommittmentItem;
