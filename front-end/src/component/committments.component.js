import React, { Component } from 'react';
import * as firebase from 'firebase';
import './component_css/committments.css';

import CommittmentItem from "./committmentItem.js";
import NavigationButton from "./navigation.button.component.js";

class Committments extends Component {
    constructor(props){
        super(props);
        this.name = this.props.name;
        this.state = {
            items: [

            ],
            completedItems: [],
            buttons: ['Commitments Made', 'Commitments Completed'],
            selected: '0'
        };
        this.addItem = this.addItem.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.getCommittment_made =this.getCommittment_made.bind(this);
        this.getCommittment_done =this.getCommittment_done.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.selectedCallBack = this.selectedCallBack.bind(this);
        this.renderCommitments = this.renderCommitments.bind(this);
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
        await this.committment_madeRef.child(firebase.auth().currentUser.uid).ref.on("value", snapshot =>  {
            if(snapshot.val()){
                console.log(snapshot.val());
                let committments_made = [];
                let returnedData = snapshot.val();
                for (let key in returnedData) {
                    returnedData[key].commitmentID = key;
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
                    returnedData[key].commitmentID = key;
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
            let newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };
            let uuid = firebase.auth().currentUser.uid;
            let updates = {};
            const newCommittmentMadeKey = this.committment_madeRef.child(uuid).push().key;
            updates['/committments_made/' + uuid  +'/' + newCommittmentMadeKey] = newItem ;

            firebase.database().ref().update(updates).then(function(){
                console.log('committmentmade added to  Firebase!');
            }.bind(this)).catch((err) => {
                console.log('Data could not be saved. ' + err);
            });

            this._inputElement.value = "";
        }

        e.preventDefault();
    }

    deleteItem(id) {
        let databasearg = "committments_made";
        if(this.state.buttons[this.state.selected] === 'Commitments Completed'){
            databasearg = "committments_done";
        }
        console.log(databasearg);
        const commitmentRefToDelete = firebase.database().ref(databasearg).child(firebase.auth().currentUser.uid)
            .child(id);
        // deleting
        commitmentRefToDelete.remove().then((err) => {
            if (err) throw err;
            console.log(`commitment removed!`);
        });
    }

    checkItem(item) {
        if(this.state.buttons[this.state.selected] === 'Commitments Completed'){
            return;
        }

        let uuid = firebase.auth().currentUser.uid;
        let updates_done = {};
        const newCommittmentDoneKey = this.committment_doneRef.child(uuid).push().key;
        updates_done['/committments_done/' + uuid  +'/' + newCommittmentDoneKey] = item;

        firebase.database().ref().update(updates_done).then(function(){
            console.log('commmittmentdone added to Firebase!');
            this.deleteItem(item.commitmentID);
        }.bind(this)).catch((err) => {
            console.log('Data could not be saved. ' + err);
        });
    }

    selectedCallBack(selectedID){
        this.setState({selected: selectedID})
    }

    renderButtons(){
        let buttons = [];
        for (let i in this.state.buttons){
            let isSelected = false;
            this.state.selected === i ? isSelected = true : isSelected = false;
            buttons.push(<NavigationButton key={i} name={this.state.buttons[i]}
                                           selected={isSelected} buttonIndex={i} selectCallBack={this.selectedCallBack}/>)
        }
        return buttons
    }

    renderCommitments(){
      if(this.state.buttons[this.state.selected] === 'Commitments Made'){
        if(this.state.items.length === 0){
            return(<li className="postFont smallFont">No commitments made!</li>);
        }
        return( <CommittmentItem entries={this.state.items}
                                 check={this.checkItem}
                                  remove={this.deleteItem}/>);
      } else {
          if(this.state.completedItems.length === 0){
              return(<li className="postFont smallFont">No completed commitments to show! Get cracking.</li>);
          }
          return( <CommittmentItem entries={this.state.completedItems}
                                   check={this.checkItem}
                                   remove={this.deleteItem}/>);
      }
    }


    render() {
        return (
            <div className="Committments">
              <div id="myDIV" className="header">
                <div className="commitments_contrler">
                  <form className="maxWidth"onSubmit = {this.addItem}>
                    <div className="flexRow">
                      <input className="committment_form" ref={(a) => this._inputElement = a}
                             placeholder="New Plans? Make a new committment. Saving the world is a group effort!">
                      </input>
                      <button className="addBtn" type="submit">Add</button>
                    </div>
                  </form>

                </div>
                <div className="flexRow flexEnd">
                    {this.renderButtons()}
                </div>
              </div>
              <ul id="myUL">
                  {this.renderCommitments()}
              </ul>
            </div>
        );
    }
}

export default Committments;
