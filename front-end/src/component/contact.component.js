import React, { Component } from 'react';
import './component.css';
import IoIconPack from 'react-icons/lib/io'
class Contact extends Component {
  constructor(prop){
      super(prop)
      this.state = {
               image: prop.image,
               email: prop.email,
               name: prop.name
          };
  }


  render() {
    return (
      <div className="Contact">
          <img src={this.state.image} className="contactImage" alt="contact_image" />
          <div className="contactText flexRow justifyRow">
           <strong>{this.state.name}</strong>
         </div>
         <div className="contactInfo flexRow justifyRow">
          {this.state.email}
        </div>
        <a href="#"><i class="social-facebook"></i></a>
        <p><button>Contact</button></p>
   </div>
    );
  }
}


//   render(){
//     return (
//       //<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
//       <div className="Contact">
//           <img src={this.state.image} className="contactImage" alt="contact_image" />
//           <h1>{this.state.name}</h1>
//           <p class="title">Example</p>
//           <p>Impact Experience</p>
//           <a href="#"><i class="fa fa-twitter"></i></a>
//           <a href="#"><i class="fa fa-linkedin"></i></a>
//           <a href="#"><i class="fa fa-facebook"></i></a>
//           <p><button>Contact</button></p>
//       </div>
//     );
//   }
// }
export default Contact;
