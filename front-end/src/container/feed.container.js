import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Post from '../component/post.component.js'
import './container_css/feed.css';

import * as moment from 'moment';

import * as firebase from 'firebase';

class Feed extends Component {
    constructor(props){
        super(props)
        console.log(props);
        console.log("Props");
        this.state = {
            feed_cohort: this.props.userObj.cohort,
            all_cohorts: [
                { value: 'virgina17', label: '#Virginia17' },
                { value: 'puterico19', label: 'Puterico19' },
            ],
            user_image: this.props.userObj.dp,
            new_post: {
                content: "",
                link: "",
                cohort: this.props.userObj.cohort
            },
            userObj: this.props.userObj,
            postList: ""
        }

        //"https://media.licdn.com/dms/image/C5103AQHS2GnhC9haBw/profile-displayphoto-shrink_800_800/0?e=1529906400&v=beta&t=FZPFq_L6xZSU_Z1Il9EG4mXmbgts17FPxBhJN1Gg97A",
        this.submitPost = this.submitPost.bind(this);
        this.createPost = this.createPost.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.timeForPosts = false;
        this.renderPosts = this.renderPosts.bind(this);
        this.getNewPosts = false;

    }

    arrayToReactSelectOptions(cohortsArray){
        let options = [];
        for (let i in cohortsArray){
            let option = {value: cohortsArray[i], label: cohortsArray[i]}
            options.push(option);
        }
        return options
    }


    getCohortID(cohortvalue){
        for (let i in this.state.all_cohorts){
            console.log(this.state.all_cohorts[i].value);
            if (this.state.all_cohorts[i].value === cohortvalue){
                return i;
            }
            console.log('Mer');
        }
    }


    componentDidMount(){
        //Refs
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
        await this.postRef.child(cohortID).ref.on("value", snapshot =>  {
            if(snapshot.val()){
                let postData = [];
                let returnedData = snapshot.val();
                for (let key in returnedData) {
                    let postAdd = returnedData[key];
                    postAdd.postId = key;
                    postData.push(postAdd);
                }
                this.setState({postList: postData})
            } else {
            }
        });
    }


    async getCohorts(){
        await this.cohortRef.ref.on("value", snapshot =>  {
            if(snapshot.val()){
                let cohorts = [];
                let returnedData = snapshot.val();
                for (let key in returnedData) {
                    cohorts.push(returnedData[key]);
                }
                //
                this.setState({all_cohorts: this.arrayToReactSelectOptions(cohorts)});
                this.timeForPosts = true;
            } else {
            }
        });
    }

    createPost(postObject){
        postObject.date = moment().format("MM-DD-YYYY");
        postObject.uuid = firebase.auth().currentUser.uid;

        console.log(postObject.cohort);
        let cohortID = this.getCohortID(postObject.cohort);
        console.log(postObject);
        console.log(cohortID);
        let updates = {};
        const newPostKey = firebase.database().ref('posts').child(cohortID).push().key;
        updates['/posts/' + cohortID  +'/' + newPostKey] = postObject;

        firebase.database().ref().update(updates).then(function(){
            console.log('Post added to  Firebase!');
        }.bind(this)).catch((err) => {
            console.log('Data could not be saved. ' + err);
        });
    }

    selectFeedCohort(newValue){
        this.setState({feed_cohort: newValue.value})
        this.getNewPosts = true;
        //Send backend request
        //Start spinner till then
    }

    newPostCohort(newValue){
        this.setState(prevState => ({
            new_post: {
                ...prevState.new_post,
                cohort: newValue.value
            }
        }))
    }

    newPostContentUpdate(event){
        let new_post = Object.assign({}, this.state.new_post);
        new_post.content = event.target.value
        this.setState({
            new_post
        })
    }

    newPostLinkUpdate(event){
        let new_post = Object.assign({}, this.state.new_post);
        new_post.link = event.target.value
        this.setState({
            new_post
        })
        //potentially show just the first part of the URL only.
    }


    postReady(){
        document.getElementById("edit_post_bar").classList.remove("visibilityOff");
    }


    submitPost() {
        document.getElementById("edit_post_bar").classList.add("visibilityOff");
        console.log(this.state.new_post);
        this.createPost(this.state.new_post);
        let new_post = Object.assign({}, this.state.new_post);
        new_post.content = ""
        this.setState({
            new_post
        });
    }

    renderPosts(){
        let postList = []
        for (let i in this.state.postList){
            console.log(this.state.postList[i].postId);
            postList.push(<Post key={this.state.postList[i].postId} post={this.state.postList[i]}/>)
        }
        return postList;
    }

    render() {
        console.log(this.state.postList);
        if(this.timeForPosts){
            this.timeForPosts = false;
            this.getPosts();
        }
        if(this.getNewPosts){
            this.getNewPosts = false;
            this.cohortRef.off()
            this.cohortRef = null;
            this.cohortRef = firebase.database().ref('cohort');
            this.getPosts();
        }


        return (
            <div className= "flexCol">
                <div className="feedBar flexRow justifyRow">
                    <Select
                        className="selectFeed"
                        name="form-field-name"
                        value={this.state.feed_cohort}
                        onChange={this.selectFeedCohort.bind(this)}
                        options={this.state.all_cohorts}
                    />
                </div>
                <div className="height-controller">
                    <div className="updateBar flexRow justifyRow">
                        <div className="avatar_div">
                            <img className="update_Avatar"
                                 src={this.state.user_image}/>
                        </div>
                        <div className="updatePost">
                            <textarea className="postTextArea" placeholder={"Any Updates? Start a Conversation."} value={this.state.new_post.content} onChange={this.newPostContentUpdate.bind(this)}  onClick={this.postReady} />
                            <div id="edit_post_bar"className="visibilityOff  flexRow ">
                                <textarea className="donationArea" placeholder={"Add a donation link"} onChange={this.newPostLinkUpdate.bind(this)}  />
                                <Select
                                    className="postSelection"
                                    name="make-post-name"
                                    value={this.state.new_post.cohort}
                                    onChange={this.newPostCohort.bind(this)}
                                    options={this.state.all_cohorts}
                                />
                                <div onClick={this.submitPost} className=" flexRow justifyRow"><div className="submitBut">Post</div></div>
                            </div>
                        </div>
                    </div>
                    <div className="feed">
                        {this.renderPosts()}
                    </div>
                </div>
            </div>
        );
    }
}



export default Feed;
