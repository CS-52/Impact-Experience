import React, { Component } from 'react';
import './committments.css';

class Committments extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date().toLocaleDateString(),
      name: "Someone",
      description: "someone@impact.com",
      image: "https://media.licdn.com/dms/image/C5103AQHS2GnhC9haBw/profile-displayphoto-shrink_800_800/0?e=1529906400&v=beta&t=FZPFq_L6xZSU_Z1Il9EG4mXmbgts17FPxBhJN1Gg97A",
      post: "Example Post Example Post Example Post Example Post Example Post Example Post",
      comments: '10',
      tags: '#impact-experience #coalminers #success #projectideas'
    };
  }

  render() {
    return (
      <div className="Committments">
        <div className="flexRow">
          <div className= "heading">
            <strong> Your Committments </strong>
          </div>
           <div className="avatarMargin" >
            <img className="Avatar"
            src={this.state.image}/>
           </div>
            <div className="Post flexCol">
             <div className="UserInfo flexCol">
               <div><strong>{this.state.name}</strong></div>
               <div><em>{this.state.description}</em></div>
             </div>
              <div className="Post">
                 <div>{this.state.post}</div>
              </div>
               <input className="button" type="submit" value="Donate/Help" />
               <input className="button" type="submit" value="Comment" />
            </div>
        </div>
    </div>
    );
  }
}

  export default Committments;
