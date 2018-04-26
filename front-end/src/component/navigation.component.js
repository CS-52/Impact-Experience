import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './navigation.css';

class NavigationBar extends Component {
  constructor(prop){
      super(prop)
      this.state = {
               dp: prop.image,
               fname: prop.firstname
          };
  }

  render() {
    return (
      <div className="navigationBar flexCol">
          <img src={this.state.dp} className="dpImage" alt="display picture" />
          <div className="navFont">{this.state.fname}</div>
          <div className="navButtons flexCol">
              <Link to='/'><div className="flexRow  justifyRow navFont navButtonFont"><span class="ri ri-chevron-right-circle iconpadding"></span> Feed</div></Link>
              <Link to='/search'><div className="flexRow justifyRow navFont navButtonFont selected"><span class="ri ri-search iconpadding"></span>Search</div></Link>
          </div>
   </div>
    );
  }
}

export default NavigationBar;
