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

  selected(event){
    document.getElementById('feedNav').classList.toggle("selected");
    document.getElementById('searchNav').classList.toggle("selected");
  }


  render() {
    return (
      <div className="navigationBar flexCol">
          <img src={this.state.dp} className="dpImage" alt="display picture" />
          <div className="navFont">{this.state.fname}</div>
          <div className="navButtons flexCol">
              <Link className="routingLink" to='/'>
                  <div id="feedNav" onClick={this.selected} className="flexRow  justifyRow navFont navButtonFont selected">
                      <span className="ri ri-chevron-right-circle iconpadding"></span>Feed
                  </div>
              </Link>
              <Link className="routingLink"  to='/search'>
                  <div id="searchNav" onClick={this.selected} className="flexRow justifyRow navFont navButtonFont">
                         <span className="ri ri-search iconpadding"></span>Search
                  </div>
              </Link>
              <Link className="routingLink" to='/profile'>
                  <div id="profileNav" onClick={this.selected} className="flexRow  justifyRow navFont navButtonFont selected">
                      <span className="ri ri-chevron-right-circle iconpadding"></span>Profile
                  </div>
              </Link>
          </div>
   </div>
    );
  }
}

export default NavigationBar;
