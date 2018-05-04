import React, { Component } from 'react';
import Committments from '../component/committments.component.js'
import './profile.css';

class Profile extends Component {
  constructor(prop){
      super(prop)
  }

  render() {
    return (
      <div className= "flexCol">
       <div className="feedBar flexRow justifyRow">
        <input className="addQbtn" type="submit" value="Add Question" />
       </div>
       <div className="profile">
          <Committments/>

       </div>
     </div>
    );
  }
}

export default Profile;
