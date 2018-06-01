import React, { Component } from 'react';
import NavigationBar from './component/navigation.component.js'
import * as firebase from 'firebase';

// import FirebaseDataManager from './firebase.dataManager.js'


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
            cohorts: ""
        }
        //initialize firebase
        var config = {
            apiKey: "AIzaSyDkGJLFc9r_DwdMQq_aNZCzUFBBR33mNcw",
            authDomain: "impact-experience-cssg.firebaseapp.com",
            databaseURL: "https://impact-experience-cssg.firebaseio.com",
            projectId: "impact-experience-cssg",
            storageBucket: "impact-experience-cssg.appspot.com",
            messagingSenderId: "364971926657"
        };
        firebase.initializeApp(config);

        this.loggedIn = this.loggedIn.bind(this);
        this.createUser   = this.createUser.bind(this);
        this.getUserObject = this.getUserObject.bind(this);
        this.redirectLoggedIn = false;
        this.userObj = {name:"error",user_dp:"error",email:"error" };
        // this.dataManager = FirebaseDataManager();
        // FirebaseDataManager.getAllCohorts(this.updateCohortState.bind(this))
    }

    componentDidMount(){
        //Refs
        this.cohortRef = firebase.database().ref('cohort');


        this.getCohorts();
    }
    componentWillUnmount(){
        //Refs
        this.cohortRef.off()
        this.cohortRef = null;

        this.getCohorts();
        this.signOut();
        this.props.history.push('/')
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
        let usersRef = firebase.database().ref('users').child(firebase.auth().currentUser.uid);
        usersRef.ref.once("value",snapshot =>  {
            if(snapshot.val()){
                this.redirectLoggedIn = true;
                this.userObj = snapshot.val()
                this.setState({userObj: snapshot.val()});

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
        /*
        Type: Normal/Admin,
        Cohort: 'Specific Cohort'/ None
        */
        let cohort = state.cohortChoice;
        let type = state.type;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            console.log("Sign Up finished")
            //TODO: FIX THIS
            this.createUser({
                name: name,
                email: email,
                dp: image,
                cohort: cohort,
            });

        }.bind(this), function(error) {
            console.log("sign Up failed")
            callback(error.message)
        }.bind(this));
    }

    /*Track Presence*/
    trackUserPresence() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                //if logged in do nothing
            } else {
                this.redirectLoggedIn = false;
                //Link them back to '/'
            }
        });
    }

    /*Sign out*/
    signOut() {
        firebase.auth().signOut().then(function() {
            console.log('User Signed Out');
            //Redirect to '/' page
        }.bind(this), function(error) {
            console.log('Sign Out Error', error);
        }.bind(this));
    }

    /*Sign In*/
    signIn(state, callback){
        let email = state.email;
        let password = state.password;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            console.log("Signed in")
            this.trackUserPresence()
            this.getUserObject();
        }.bind(this), function(error) {
            console.log("Failed")
            callback(error.message)
        }.bind(this));
    }

    /*Create User*/
    createUser(userObject){
        //Create User
        let updates = {};
        updates['/users/' + firebase.auth().currentUser.uid] = userObject;

        firebase.database().ref().update(updates).then(function(){
            console.log('User added to  Firebase!');
            this.trackUserPresence()
            this.getUserObject();
        }.bind(this)).catch((err) => {
            console.log('Data could not be saved. ' + err);
        });
    }


    // loggedIn(){
    //   return(
    //     <div className="flexRow fullpage">
    //       <NavigationBar image={this.state.user_dp} firstname={this.state.firstname}/>
    //         <Switch>
    //             <Route exact path='/loggedIn/' component={Feed}/>
    //             <Route path='/loggedIn/search' component={Search}/>
    //             <Route path='/loggedIn/profile' component={Profile}/>
    //         </Switch>
    //     </div>
    //  );
    // }

    loggedIn(){
        return(
                <Switch>
                    <Route exact path='/loggedIn/' component={(props) => <Base userObj={this.userObj}/>}/>
                    <Route path='/loggedIn/search' component={Search}/>
                    <Route path='/loggedIn/profile' component={Profile}/>
                </Switch>
        );
    }



//<NavigationBar image={this.state.user_dp} firstname={this.state.firstname}/>
    render() {
        console.log('why');
        console.log(this.redirectLoggedIn);
        if (this.redirectLoggedIn === true) {
            this.redirectLoggedIn = false
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
