import React, { Component } from "react";
import './component_css/committments.css';

class CommittmentItem extends Component {
  constructor(props) {
  console.log('new comm');
  super(props);
  this.state = {
    items: this.props.entries
  };
  this.createTasks = this.createTasks.bind(this);
  this.closeButton = this.closeButton.bind(this);
  this.remove = this.remove.bind(this);
}

 componentWillReceiveProps(props){
   console.log('!!!');
   this.setState({items: props.entries});
 }

  createTasks(item) {
    return <li className="postFont smallFont" onClick={() => this.check(item)}
              key={item.key}> {item.text}
              <span onClick={this.closeButton}> <button data-id={item.commitmentID} className="closeButton"> X </button> </span>
           </li>
  }

  closeButton(e){
    this.props.remove(e.target.dataset.id)
    e.stopPropagation();
  }

  check(item) {
    //item.setAttribute("className", "checked");
    this.props.check(item);
  }

  remove(item) {
    console.log('In ittem');
    console.log(item);
    this.props.remove(item);
  }

  render() {
    var todoEntries = this.state.items;
    console.log("what is happening");
    console.log(todoEntries);
    var listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};

export default CommittmentItem;
