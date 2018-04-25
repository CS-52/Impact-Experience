import React, { Component } from 'react';
import './component.css';
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
          <div className="contactText">
           {this.state.name}
         </div>
         <div className="contactText">
         {this.state.email}
        </div>
   </div>
    );
  }
}

export default Contact;
