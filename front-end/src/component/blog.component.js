import React, { Component } from 'react';
import './blog.css';

class Blog extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date().toLocaleDateString(),
      text: props.text,
      name: props.name,
      email: props.email,
      profile: props.profile,
      ptitle: props.ptitle,
      pimg: props.pimg,
      comments: '10',
      tags: '#impact-experience #coalminers #success #projectideas'
    };
  }

  render() {
    return (
      <div className="Blog">
      <h3 className="ptitle">{this.state.ptitle}<small>{this.state.date}</small></h3>
      <img
        src={this.state.pimg}
        alt = 'Image for Blog Post' />

        <div className="UserInfo">
          <img className="Avatar"
            src={this.state.image}
            alt={this.state.name}
         />
        <div className="UserInfo-contact">
          {this.state.name}
          {this.state.email}
        </div>
      </div>
      <p> <div className="Blog-text">{this.state.text}</div> </p>
      <div className="Blog-details">
        <ul className="menu simple">
        <li> Author: <a href="#" onClick={this.tryClick}> {this.state.name}</a></li>
        <li> Comments: <a href="#"> {this.state.comments}</a></li>
        <li> Tags: <a href="#">  {this.state.tags} </a></li>
        </ul>
      </div>
    </div>
    );
  }
}

// return(
//     <div className="blog-post">
//       <h3 className="ptitle">{this.props.ptitle}<small>{this.props.date}</small></h3>
//       <img className="thumbnail" src={this.props.pimg} />
//       <p>{this.props.test}</p>
//       <div className="callout callout-post">
//         <ul className="menu simple">
//         <li><a href="#" onClick={this.tryClick}>Author: {this.props.author}</a></li>
//         <li><a href="#">{comments}: {this.props.comments}</a></li>
//         <li><a href="#">Tags: {h.getTaggedName()}</a></li>
//         </ul>
//       </div>
//     </div>
// );

  export default Blog;
