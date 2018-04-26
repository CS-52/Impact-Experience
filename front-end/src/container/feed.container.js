import React, { Component } from 'react';
import './feed.css';

class Feed extends Component {
  constructor(prop){
      super(prop)
  }

  render() {
    return (
      <div className= "flexCol">
       <div className="feedBar flexRow justifyRow">
        <input className="addQbtn" type="submit" value="Add Question" />
       </div>
     </div>
    );
  }
}

export default Feed;
