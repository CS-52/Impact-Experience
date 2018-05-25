import React, { Component } from 'react';
import Committments from '../component/committments.component.js'
import './container_css/profile.css';

class Profile extends Component {
  constructor(prop){
      super(prop)
  }

  render() {
    return (
      <div className= "flexCol">
       <div className="profile">
          <Committments/>
       </div>
     </div>
    );
  }
}

export default Profile;
