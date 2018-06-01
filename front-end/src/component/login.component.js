import React, { Component } from 'react';
import './component_css/login.css';
import IECover from '../Assets/images/IE-Cover.png';

class Login extends Component {

  render() {
    return (
      <section>
        <div className = "column left">
          <img src={IECover} className="leftimage"/>
        </div>
        <div className = "column right">
          <div className = "heading">
            <img className = "heading"
              src={'https://static.wixstatic.com/media/34f020_4e611f0cbf0b4d098759e46f01785830~mv2.png/v1/fill/w_418,h_162,al_c,usm_0.66_1.00_0.01/34f020_4e611f0cbf0b4d098759e46f01785830~mv2.png'}/>
          </div>
          <form>
              <input className="input" type="text" value={"Username"} />
              <input className="input" type="text" value={"Password"} />
          </form>
          <button className = "loginbutton">Login</button>
          <button className = "loginbutton">Sign Up</button>
        </div>
      </section>
    );
  }
}

export default Login;
