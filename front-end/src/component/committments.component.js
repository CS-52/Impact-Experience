import React, { Component } from 'react';
import * as firebase from 'firebase';
import './component_css/committments.css';
import CommittmentItem from "./committmentItem.js";

class Committments extends Component {
  constructor(props){
    super(props);
    this.name = this.props.name;
    this.state = {
      items: [

      ],
      completedItems: []
    };
    this.addItem = this.addItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.getCommittment_made =this.getCommittment_made.bind(this);
    this.getCommittment_done =this.getCommittment_done.bind(this);
  }

  componentDidMount(){
    //Refs
    this.committment_madeRef = firebase.database().ref('committments_made');
    this.committment_doneRef = firebase.database().ref('committments_done');
    this.getCommittment_made()
    this.getCommittment_done()
  }


  componentWillUnmount(){
    //Refs
    this.committment_madeRef.off()
    this.committment_madeRef = null;
    this.committment_doneRef.off()
    this.committment_doneRef = null;
  }

  async getCommittment_made(){
    console.log('Querying Commitments Made')
    await this.committment_madeRef.child(firebase.auth().currentUser.uid).ref.on("value", snapshot =>  {
      if(snapshot.val()){
        console.log(snapshot.val());
        let committments_made = [];
        let returnedData = snapshot.val();
        for (let key in returnedData) {
          committments_made.push(returnedData[key]);
        }
        //
        this.setState({items: committments_made});
      } else {
      }
    });
  }

  async getCommittment_done(){
    await this.committment_doneRef.child(firebase.auth().currentUser.uid).ref.on("value", snapshot =>  {
      if(snapshot.val()){
        console.log(snapshot.val());
        let committments_done = [];
        let returnedData = snapshot.val();
        for (let key in returnedData) {
          committments_done.push(returnedData[key]);
        }
        //
        this.setState({completedItems: committments_done});
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

    let uuid = firebase.auth().currentUser.uid;
    let updates = {};
    const newCommittmentMadeKey = this.committment_madeRef.child(uuid).push().key;
    updates['/committments_made/' + uuid  +'/' + newCommittmentMadeKey] = newItem ;

    firebase.database().ref().update(updates).then(function(){
      console.log('committmentmade added to  Firebase!');
    }.bind(this)).catch((err) => {
      console.log('Data could not be saved. ' + err);
    });


    // if (this._inputElement.value !== "") {
    //     var newItem = {
    //       text: this._inputElement.value,
    //       key: Date.now()
    //     };
    //     this.setState((prevState) => {
    //       return {
    //         items: prevState.items.concat(newItem)
    //       };
    //     });
    //     this._inputElement.value = "";
    // }
    //   console.log(this.state.items);
    e.preventDefault();
  }

  deleteItem(item) {
    console.log(item);
    console.log("entered deleteitem");
    // var filteredItems = this.state.items.filter(function (temp_item) {
    //   return (temp_item.key !== item.key);
    // });
    //
    // this.setState({
    //   items: filteredItems
    // });
    //
    // let uuid = firebase.auth().currentUser.uid;
    // let updates_done = {};
    // const newCommittmentDoneKey = this.committment_doneRef.child(uuid).push().key;
    // updates_done['/committments_done/' + uuid  +'/' + newCommittmentDoneKey] = item ;
    //
    // firebase.database().ref().update(updates_done).then(function(){
    //     console.log('commmittmentdone added to  Firebase!');
    // }.bind(this)).catch((err) => {
    //     console.log('Data could not be saved. ' + err);
    // });
    //
    // console.log(this.state.completedItems);
  }

  checkItem(item) {
    console.log("entered checkitem")
    // var element = document.getElementById("myUL");
    // element.classList.toggle("checked");
    this.setState((prevState) => {
      return {
        completedItems: prevState.completedItems.concat(
          this.state.items.filter(function (temp_item) {
            return (temp_item.key == item.key);
          })
        )
      };
    });
    //this.deleteItem(key);
    // document.getElementsByClassName('key').classList.add('checked');
    // console.log(document.getElementsbyClassName('ul li').classList.add('checked'));
    let uuid = firebase.auth().currentUser.uid;
    let updates_done = {};
    const newCommittmentDoneKey = this.committment_doneRef.child(uuid).push().key;
    updates_done['/committments_done/' + uuid  +'/' + newCommittmentDoneKey] = item ;

    firebase.database().ref().update(updates_done).then(function(){
      console.log('commmittmentdone added to  Firebase!');
    }.bind(this)).catch((err) => {
      console.log('Data could not be saved. ' + err);
    });

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
      <div className="commitments_contrler">
        <form onSubmit = {this.addItem}>
        <div className="flexRow">
            <input className="committment_form" ref={(a) => this._inputElement = a}
              placeholder="New Plans? Make a new committment">
            </input>
            <button className="addBtn" type="submit">Add</button>
        </div>
      </form>
      </div>
      <div className="flexRow flexEnd">
          <div> Current Commitments </div>
          <div> Completed Commitments </div>
      </div>
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
