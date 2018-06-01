import React, { Component } from 'react';
import * as firebase from 'firebase';

import NavigationButton  from '../component/navigation.button.component'
import logo from '../Assets/images/imp-log.png'

import './container_css/base.css'
import { Switch, Route, withRouter, Redirect} from 'react-router-dom';
import Search from '../container/search.container.js';
import Feed from '../container/feed.container.js';
import Profile from '../container/profile.container.js';



class Base extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttons: ['feed', 'search', 'profile'],
            selected: '0'
        }
        this.selectedCallBack = this.selectedCallBack.bind(this)
        this.renderButtons = this.renderButtons.bind(this)
        this.renderView = this.renderView.bind(this);
    }

    selectedCallBack(selectedID){
       this.setState({selected: selectedID})
    }

    renderButtons(){
        let buttons = [];
        for (let i in this.state.buttons){
            let isSelected = false;
            this.state.selected === i ? isSelected = true : isSelected = false;
            buttons.push(<NavigationButton key={i} name={this.state.buttons[i]}
                                           selected={isSelected} buttonIndex={i} selectCallBack={this.selectedCallBack}/>)
        }
        return buttons
    }

    renderView(){
        if(this.state.buttons[this.state.selected] === 'feed'){
            return <Feed userObj={this.props.userObj}/>;
        } else if (this.state.buttons[this.state.selected] === 'search'){
            return <Search cohort={this.props.userObj.cohort}/>
        } else {
            return <Profile/>;
        }
    }

    //
    render(){
      return(
          <div id="base-container">
              <div id="Navigation-Bar" className="flexRow">
                  <div className="flexRow justifyRow"><img className="logonav" src={logo}/></div>
                  <div className="flexRow">
                      {this.renderButtons()}
                  </div>
              </div>
              <div id="bottom-base-container" className="flexRow">
                  <div id="user-summary"></div>
                  <div className="element_container">
                      {this.renderView()}
                  </div>
              </div>

          </div>
      );
    }
}

export default Base;
