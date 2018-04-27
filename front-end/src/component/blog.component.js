import React, { Component } from 'react';
import './blog.css';

class Blog extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date().toLocaleDateString(),
      name: "Haiwen",
      description: "Exec@Impact",
      email: props.email,
      image: "https://media.licdn.com/dms/image/C5103AQHS2GnhC9haBw/profile-displayphoto-shrink_800_800/0?e=1529906400&v=beta&t=FZPFq_L6xZSU_Z1Il9EG4mXmbgts17FPxBhJN1Gg97A",
      post: "Example post Example post Example post Example post Example post Example post",
      comments: '10',
      tags: '#impact-experience #coalminers #success #projectideas'
    };
  }

  render() {
    return (
      <div className="Blog">
        <div className="flexRow">
           <div className="avatarMargin flexRow" >
            <img className="Avatar"
            src={this.state.image}/>
           </div>
            <div className="Post flexCol">
             <div className="UserInfo flexCol">
               <div>{this.state.name}</div>
               <div>{this.state.description}</div>
             </div>
              <div className="Post">
                 <div>{this.state.post}</div>
              </div>
            </div>
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


// <h3 className="ptitle">{this.state.ptitle}<small>{this.state.date}</small></h3>
//
//    <div className="Blog-text">{this.state.text}</div>
//    <div className="Blog-details">
//      <ul className="menu simple">
//        <li> Author: <a href="#" onClick={this.tryClick}> {this.state.name}</a></li>
//        <li> Comments: <a href="#"> {this.state.comments}</a></li>
//        <li> Tags: <a href="#">  {this.state.tags} </a></li>
//       </ul>
//   </div>

  export default Blog;
