import React, { Component } from 'react';
import NavigationBar from './component/navigation.component.js'
import {auth, database} from 'firebase';


import './App.css';
import './Assets/RivoliconsWebFont/style.css';
import { Switch, Route, withRouter, Redirect} from 'react-router-dom';
import Search from './container/search.container.js';
import Feed from './container/feed.container.js';
import Profile from './container/profile.container.js';
import LoginPage from './container/login.container.js';

import Base from './container/base.js';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            userObj: {name:"error",user_dp:"error",email:"error" },
            cohorts: "",
            userLoggedIn: false
        }
        this.redirectToLoggedIn = false;
        this.loggedIn = this.loggedIn.bind(this);
        this.createUser   = this.createUser.bind(this);
        this.getUserObject = this.getUserObject.bind(this);
        this.userObj = {name:"error",user_dp:"error",email:"error" };
    }

    componentDidMount(){
        //first get user presence
        this.trackUserPresence();
        this.cohortRef = database().ref('cohort');
        this.getCohorts();
    }
    componentWillUnmount(){
        //Refs
        this.cohortRef.off()
        this.cohortRef = null;

        this.getCohorts();
        this.signOut();
    }


    async getCohorts(){
        await this.cohortRef.ref.on("value", snapshot =>  {
            if(snapshot.val()){
                let cohorts = [];
                let returnedData = snapshot.val();
                for (let key in returnedData) {
                    cohorts.push(returnedData[key]);
                }
                this.setState({cohorts:cohorts})
            } else {
            }
        });
    }

    async getUserObject(){
        let usersRef = database().ref('users').child(auth().currentUser.uid);
        usersRef.ref.once("value",snapshot =>  {
            if(snapshot.val()){
                this.userObj = snapshot.val()
                this.redirectToLoggedIn = true;
                this.setState({userObj: snapshot.val(), userLoggedIn:true});

            } else {
                this.signOut();
            }
        });
    }


    updateCohortState(dataObject){
        this.setState({cohorts:dataObject})
    }

    /* Sign Up*/
    signUp(state, callback){
        let email = state.email;
        let password = state.password;
        let name = state.displayName;
        let image = state.user_dp;
        let cohort = state.cohortChoice;
        let type = state.type;
        auth().createUserWithEmailAndPassword(email, password).then(function() {
            this.createUser({
                name: name,
                email: email,
                dp: image,
                cohort: cohort,
            });

        }.bind(this), function(error) {
            callback(error.message)
        }.bind(this));
    }

    /*Track Presence*/
    trackUserPresence() {
        auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                console.log('firebaseUser logged in');
                this.getUserObject();
            } else {
                console.log('firebaseUser logged out');
                this.setState({userLoggedIn:false});
            }
        });
    }

    /*Sign out*/
    signOut() {
        auth().signOut().then(function() {
            console.log('User Signed Out');
        }.bind(this), function(error) {
            console.log('Sign Out Error', error);
        }.bind(this));
    }

    /*Sign In*/
    signIn(state, callback){
        let email = state.email;
        let password = state.password;
        auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            callback(error.message)
        }.bind(this));
    }

    /*Create User*/
    createUser(userObject){
        //Create User
        let updates = {};
        updates['/users/' + auth().currentUser.uid] = userObject;

        database().ref().update(updates).then(function(){
            this.trackUserPresence()
        }.bind(this)).catch((err) => {
            console.log('Data could not be saved. ' + err);
        });
    }

    loggedIn(){
        //if not loggedIn redirect.
        if(!this.state.userLoggedIn){
          console.log('error');
          return(<Redirect to='/' />);
        }
        return(
                <Switch>
                    <Route exact path='/loggedIn/' component={(props) => <Base userObj={this.userObj}/>}/>
                </Switch>
        );
    }



//<NavigationBar image={this.state.user_dp} firstname={this.state.firstname}/>
    render() {
        if (this.redirectToLoggedIn === true) {
              console.log('Hello');
              this.redirectToLoggedIn = false;
              return(<Redirect to='/loggedIn' />);
        }
        return (
            <div>
                <Switch>
                  <Route  exact path='/' component={(props) => <LoginPage {...props} firebaseLogin={this.signIn.bind(this)}  firebaseSignup={this.signUp.bind(this)} cohorts={this.state.cohorts}/>}/>
                  <Route path='/loggedIn' component={this.loggedIn}/>
                </Switch>
          </div>
        );
    }
}

export default withRouter(App);
