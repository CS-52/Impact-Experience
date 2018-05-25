import React, { Component } from 'react';
import Contact from '../component/contact.component.js';
import './container_css/search.css'; //Todo: Change this!

//React Select stuff
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class LoginPage extends Component {
    constructor(props){
        super(props)
        console.log(props);
        this.state = {
           email: "",
           password: "",
           error: "",
           type: "n",
           cohort: "",

        };
        // choices: props.cohortChoices,
        // cohortChoice: props.cohortChoices[0],
        this.handleUser = this.handleUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleUser(event) {

        this.setState({email: event.target.value, error: ""});
      }
      handlePassword(event) {
        this.setState({password: event.target.value, error: ""});
      }

      handleCohort(event){
        this.setState({choices: event.target.value, error: ""})
      }

      handleSubmit(event) {
        this.props.firebaseLogin(this.state, this.firebaseCallBack.bind(this));
        //We need to hear back?
      }

      firebaseCallBack(message){
        console.log('Hi');
        console.log(message);
        this.setState({error: message});
        document.getElementById('errorMessage');
      }

      loginCard(){

      }

     signupCard(){
        return(
          <form onSubmit={this.handleSubmit}>
              <input className="taskinput" placeholder="email"type="text" value={this.state.email} onChange={this.handleUser} />
              <input className="taskinput" placeholder="password" type="password" value={this.state.password} onChange={this.handlePassword} />
              <Select
                  name="form-field-name"
                  value={this.state.cohortChoice}
                  onChange={this.handleCohort.bind(this)}
                  options={this.state.cohortChoices}
              />
              <span id="errorMessage">{this.state.error}</span>
            <div onClick={this.handleSubmit}> Sign Up </div>
          </form>

      );
     }



    render() {
        return (
           <div className= "flexCol">
            <div className="login flexRow justifyRow">
              <form onSubmit={this.handleSubmit}>
                  <input className="taskinput" placeholder="email"type="text" value={this.state.email} onChange={this.handleUser} />
                  <input className="taskinput" placeholder="password" type="password" value={this.state.password} onChange={this.handlePassword} />
                  <span id="errorMessage">{this.state.error}</span>
                <div onClick={this.handleSubmit}> Login </div>
              </form>
            </div>
          </div>
        );
    }
}

export default LoginPage;
