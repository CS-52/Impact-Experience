import React, { Component } from 'react';
import Blog from '../component/blog.component.js'
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
       <div className="feed">
               <Blog/>
              <Blog/>
               <Blog/>
               <Blog/>
              <Blog/>
               <Blog/>
               <Blog/>
              <Blog/>
               <Blog/>
       </div>
     </div>
    );
  }
}

export default Feed;
