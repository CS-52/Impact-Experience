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
          <div className="contactText flexRow justifyRow">
           <strong>{this.state.name}</strong>
         </div>
         <div className="contactText flexRow justifyRow">
         <em>{this.state.email}</em>
        </div>
   </div>
    );
  }
}

export default Contact;
