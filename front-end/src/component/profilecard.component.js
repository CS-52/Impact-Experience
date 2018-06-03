import React, { Component } from 'react';
import './component_css/profilecard.css';
import * as firebase from 'firebase';


import defaultImage from '../Assets/images/new_user.png'


class ProfileCard extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            name: this.props.user.name,
            description: "someone@impact.com",
            image: this.props.user.dp,
            commitments_made: 0,
            commitments_done: 0,
        };
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
                this.setState({commitments_made: committments_made.length});
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
                this.setState({commitments_done: committments_done.length});
            } else {
            }
        });
    }

    render() {
        return (
          <div className="flexCol profileCenter">
            <div className="profileCard postFont">
                <div className="flexCol">
                    <div className="backgroundCard"></div>
                    <div className="profileImage  flexRow" >
                        <img className="Avatar avat-marg"
                             src={this.state.image}/>
                        <div className="margin-cont fullname"> {this.state.name}</div>
                    </div>
                    <div className="numbersCard">
                        <div className="flexRow justifyRow max">
                                <div className="flexCol">
                                    <div className="postFont tinyFont commtMargins"> Commitments Made</div>
                                    <div className="flexRow justifyRow smallFont"> {this.state.commitments_made}</div>
                                </div>
                                <div className="flexCol commtMargins">
                                <div className="postFont tinyFont"> Commitments Completed</div>
                                <div className="flexRow justifyRow smallFont"> {this.state.commitments_done}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
          </div>
        );
    }
}

export default ProfileCard;
