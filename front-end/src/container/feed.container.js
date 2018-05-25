import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Post from '../component/post.component.js'
import './container_css/feed.css';

class Feed extends Component {
    constructor(props){
        super(props)
        this.state = {
            feed_cohort: 'virgina17',
            all_cohorts: [
                { value: 'virgina17', label: '#Virginia17' },
                { value: 'puterico19', label: 'Puterico19' },
            ],
            user_image: "https://media.licdn.com/dms/image/C5103AQHS2GnhC9haBw/profile-displayphoto-shrink_800_800/0?e=1529906400&v=beta&t=FZPFq_L6xZSU_Z1Il9EG4mXmbgts17FPxBhJN1Gg97A",
            new_post: {
                        content: "",
                        link: "",
                         cohort: "virgina17"
                     },
        }
      console.log('Hi')
    }

    selectFeedCohort(newValue){
        this.setState({feed_cohort: newValue})
        //Send backend request
        //Start spinner till then
    }

    newPostCohort(newValue){
        this.setState(prevState => ({
            new_post: {
                ...prevState.new_post,
                cohort: newValue
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

    render() {
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
                <div className="updateBar flexRow justifyRow">
                    <div className="avatar_div">
                        <img className="update_Avatar"
                             src={this.state.user_image}/>
                    </div>
                    <div className="updatePost">
                        <textarea className="postTextArea" placeholder={"Any Updates? Start a Conversation."} value={this.state.new_post.content} onChange={this.newPostContentUpdate.bind(this)}  onClick={this.postReady} />
                        <div id="edit_post_bar"className="visibilityOff  FlexRow ">
                            <textarea className="donationArea" placeholder={"Add a donation Link"} onChange={this.newPostLinkUpdate.bind(this)}  />
                            <Select
                                className="postSelection"
                                name="make-post-name"
                                value={this.state.new_post.cohort}
                                onChange={this.newPostCohort.bind(this)}
                                options={this.state.all_cohorts}
                            />
                            <span>Submit</span>
                        </div>
                    </div>
                </div>
                <div className="feed">
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        );
    }
}

export default Feed;
