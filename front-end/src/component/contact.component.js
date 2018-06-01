import React, { Component } from 'react';
import './component_css/component.css';
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
        <p><button className = "contactButton">Contact</button></p>
   </div>
    );
  }
}
export default Contact;
