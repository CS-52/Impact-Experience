import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Post from '../component/post.component.js'
import './container_css/feed.css';

import * as moment from 'moment';

import {database, auth} from 'firebase';

class Feed extends Component {
    constructor(props){
        super(props)
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


    getCohortID(cohortvalue, all_cohorts){
        for (let i in all_cohorts){
            if (all_cohorts[i].value === cohortvalue){
                return i;
            }
        }
    }


    componentDidMount(){
        //Refs
        this.cohortRef = database().ref('cohort');
        this.postRef = database().ref('posts');

        this.getCohorts();
    }


    componentWillUnmount(){
        //Refs
        this.cohortRef.off()
        this.cohortRef = null;
        this.postRef.off()
        this.postRef = null;
    }




    async getPosts(cohortValue, all_cohorts){
        let cohortID = this.getCohortID(cohortValue, all_cohorts);
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
                let newCohorts = this.arrayToReactSelectOptions(cohorts);
                this.setState({all_cohorts: newCohorts});
                this.getPosts(this.state.feed_cohort, newCohorts);
                // this.timeForPosts = true;
            } else {
            }
        });
    }

    createPost(postObject){
        postObject.date = moment().format("MM-DD-YYYY");
        postObject.uuid = auth().currentUser.uid;

        let cohortID = this.getCohortID(postObject.cohort, this.state.all_cohorts);
        let updates = {};
        const newPostKey = database().ref('posts').child(cohortID).push().key;
        updates['/posts/' + cohortID  +'/' + newPostKey] = postObject;

        database().ref().update(updates).then(function(){
            console.log('Post added to  Firebase!');
        }.bind(this)).catch((err) => {
            console.log('Data could not be saved. ' + err);
        });
    }

    selectFeedCohort(newValue){
        this.setState({feed_cohort: newValue.value})
        this.postRef.off();
        this.postRef = null;
        this.postRef = database().ref('posts');
        // this.getNewPosts = true;
        this.getPosts(newValue.value, this.state.all_cohorts);
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
            postList.push(<Post key={this.state.postList[i].postId} post={this.state.postList[i]}/>)
        }
        return postList;
    }

    render() {
        return (
            <div className= "flexCol">
                <div className="feedBar flexRow justifyRow">
                    <Select
                        className="selectFeed postFont greyFont"
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
                            <textarea className="postFont postTextArea " placeholder={"Any Updates? Start a Conversation."} value={this.state.new_post.content} onChange={this.newPostContentUpdate.bind(this)}  onClick={this.postReady} />
                            <div id="edit_post_bar"className="visibilityOff  flexRow ">
                                <textarea className="postFont donationArea " placeholder={"Add a donation link"} onChange={this.newPostLinkUpdate.bind(this)}  />
                                <Select
                                    className="postSelection postFont"
                                    name="make-post-name"
                                    value={this.state.new_post.cohort}
                                    onChange={this.newPostCohort.bind(this)}
                                    options={this.state.all_cohorts}
                                />
                                <div onClick={this.submitPost} className=" flexRow justifyRow"><div className="submitBut postFont">Post</div></div>
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
