import React, { Component } from 'react';
import './component_css/post.css';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date().toLocaleDateString(),
            name: "Tom Silvers",
            description: "someone@impact.com",
            image: "https://media.licdn.com/dms/image/C5103AQHS2GnhC9haBw/profile-displayphoto-shrink_800_800/0?e=1529906400&v=beta&t=FZPFq_L6xZSU_Z1Il9EG4mXmbgts17FPxBhJN1Gg97A",
            post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            comments: '10',
        };
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
                            <span className="button">Donate/Help</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
