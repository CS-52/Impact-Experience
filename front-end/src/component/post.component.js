import React, { Component } from 'react';
import './component_css/post.css';
import * as firebase from 'firebase';
import * as moment from 'moment';


import defaultImage from '../Assets/images/new_user.png'


class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: moment(this.props.date, ).format("MM-DD-YYYY"),
            name: "",
            description: "someone@impact.com",
            image: {defaultImage},
            post: this.props.post.content,
        };
        this.getUser = this.getUser.bind(this);
    }

    componentDidMount(){
        //Refs
        this.postUserRef = firebase.database().ref('users');
        this.getUser();
    }


    componentWillUnmount(){
        //Refs
        this.postUserRef.off()
        this.postUserRef = null;
    }

    async getUser(){
        await this.postUserRef.child(firebase.auth().currentUser.uid).ref.on("value", snapshot =>  {
            if(snapshot.val()){
                let returnedData = snapshot.val();
                this.setState({name: returnedData.name, image: returnedData.dp, description: returnedData.email})
            } else {

            }
        });
    }
    render() {
        return (
            <div className="Main_post">
                <div className="flexRow">
                    <div className="avatarMargin flexRow" >
                        <img className="Avatar"
                             src={this.state.image}/>
                    </div>
                    <div className="Post_flexCol">
                        <div className="UserInfo flexCol">
                            <div><span className="fullname">{this.state.name}</span>
                                <span className="seperator">·</span>
                                <span className="titlePost">{this.state.date}</span>
                                <span className="seperator">·</span>
                                <a className="titlePost" href="mailto">{this.state.description}</a>
                            </div>
                        </div>
                        <div className="Post">
                            <div>{this.state.post}</div>
                        </div>
                        <div className="donationBar">
                            <span className="donateButton">Donate/Help</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
