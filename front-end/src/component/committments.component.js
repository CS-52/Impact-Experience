import React, { Component } from 'react';
import * as firebase from 'firebase';
import './component_css/committments.css';
import CommittmentItem from "./committmentItem.js";

class Committments extends Component {
  constructor(props){
    super(props);
    this.name = this.props.name;
    this.state = {
      items: [],
      completedItems: []
    };
    this.addItem = this.addItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    // this.deleteItemBig = this.deleteItemBig.bind(this);
  }

  componentDidMount(){
    //Refs
    console.log('Hello committments ringing');
    this.cohortRef = firebase.database().ref('cohort');
    this.postRef = firebase.database().ref('posts');

    this.getCohorts();
  }

  componentWillUnmount(){
      //Refs
      this.cohortRef.off()
      this.cohortRef = null;
      this.postRef.off()
      this.postRef = null;
  }

  async getPosts(){
      console.log(this.state.feed_cohort)
      let cohortID = this.getCohortID(this.state.feed_cohort);
      console.log(cohortID);
      // this.postRef.child(cohortID);
      await this.postRef.child(cohortID).ref.on("value", snapshot =>  {
          if(snapshot.val()){
              let postData = [];
              let returnedData = snapshot.val();
              for (let key in returnedData) {
                  postData.push(returnedData[key]);
              }
              
              // this.setState({posts: postData});
              this.setState({postList: postData})
          } else {
          }
      });
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

  deleteItem(key) {
    console.log("entered deleteitem");
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }

  // deleteItemBig(key){
  //   this.deleteItem(key);
  // }

  checkItem(key) {
    console.log("entered checkitem")
    // var element = document.getElementById("myUL");
    // element.classList.toggle("checked");
    this.setState((prevState) => {
      return {
        completedItems: prevState.completedItems.concat(
          this.state.items.filter(function (item) {
            return (item.key == key);
          })
        )
      };
    });
    //this.deleteItem(key);
    // document.getElementsByClassName('key').classList.add('checked');
    // console.log(document.getElementsbyClassName('ul li').classList.add('checked'));
    console.log(this.state.completedItems);
  }

  render() {
    console.log("this.state.items");
    console.log(this.state.items);
    console.log("completed items")
    console.log(this.state.completedItems);
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
                           remove={this.deleteItem}/>
        </ul>
      </div>
    );
  }
}

export default Committments;
