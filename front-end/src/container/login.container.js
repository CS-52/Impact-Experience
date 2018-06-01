import React, { Component } from 'react';
import Contact from '../component/contact.component.js';
import './container_css/search.css'; //Todo: Change this!
import { Switch, Route} from 'react-router-dom';

//React Select stuff
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import './container_css/login.css'
import logo from '../Assets/images/imp-log.png'
import backdrop from '../Assets/images/banner.PNG'


class LoginPage extends Component {
    constructor(props){
        super(props)
        this.cohortChoices = this.arrayToReactSelectOptions(this.props.cohorts);
        console.log(this.cohortChoices)
        this.state = {
           email: "",
           password: "",
           displayName: "",
           error: "",
           type: "n",
           cohortChoices: this.cohortChoices,
           cohortChoice: "",
           login: true,
           user_dp: "https://i.imgur.com/n7NqNRA.png",
        };

        this.handleUser = this.handleUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.changeLoginState = this.changeLoginState.bind(this);
      }
      arrayToReactSelectOptions(cohortsArray){
          let options = [];
          for (let i in cohortsArray){
            let option = {value: cohortsArray[i], label: cohortsArray[i]}
            options.push(option);
          }
          return options
      }


      handleUser(event) {
        this.setState({email: event.target.value, error: ""});
      }
      handlePassword(event) {
        this.setState({password: event.target.value, error: ""});
      }

    handleName(event) {
        this.setState({displayName: event.target.value, error: ""});
    }

      handleCohort(option){
        this.setState({cohortChoice: option.value, error: ""})
      }

      handleLogin(event){
        this.props.firebaseLogin(this.state, this.firebaseCallBack.bind(this));
      }

      handleSignup(event) {
        this.props.firebaseSignup(this.state, this.firebaseCallBack.bind(this));
        //We need to hear back?
      }

      firebaseCallBack(message){
        this.setState({error: message});
      }

      changeLoginState(){
          this.setState({login: !this.state.login});
      }

      loginCard(){
      return(
        <form className="flexCol" onSubmit={this.handleSubmit}>
            <div className="loginWidth">
                <input className="taskinput" placeholder="email"type="text" value={this.state.email} onChange={this.handleUser} />
                <input className="taskinput" placeholder="password" type="password" value={this.state.password} onChange={this.handlePassword} />
            </div>
                 <div id="errorMessage">{this.state.error}</div>
            <div onClick={this.handleLogin} className="flexRow flex-end"> <div className="addBtn flx-end"> Login </div> </div>
            <div onClick={this.changeLoginState} className="small-ud">Don't have an account? Sign up</div>
        </form>
      );
      }

     signUpCard(){
        return(
          <form className="flexCol" onSubmit={this.handleSubmit}>
              <div className="loginWidth">
                  <input className="taskinput" placeholder="Display Name" type="text" value={this.state.displayName} onChange={this.handleName} />
                  <input className="taskinput" placeholder="email" type="text" value={this.state.email} onChange={this.handleUser} />
                  <input className="taskinput" placeholder="password" type="password" value={this.state.password} onChange={this.handlePassword} />
              </div>
              <div className="select-cont" >
                  <Select
                      name="form-field-name"
                      value={this.state.cohortChoice}
                      placeholder={"Cohort"}
                      onChange={this.handleCohort.bind(this)}
                      options={this.state.cohortChoices}
                  />
              </div>
              <div id="errorMessage">{this.state.error}</div>
              <div onClick={this.handleSignup} className="flexRow flex-end"> <div className="addBtn flx-end"> Sign Up </div> </div>
          </form>
      );
     }



    render() {
        return (
           <div className= "flexRow height">
            <div className="loginBanner"><img className="bannerimg" src={backdrop}/></div>
            <div className="login flexCol justifyRow">
                <div><img className="logologin" src={logo}/></div>
              <div className="flexRow justifyRow">
              {this.state.login ?  this.loginCard():this.signUpCard() }
              </div>
            </div>

          </div>


        );
    }
}

export default LoginPage;
