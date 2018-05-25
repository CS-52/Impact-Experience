import React, { Component } from 'react';
import NavigationBar from './component/navigation.component.js'
import * as firebase from 'firebase';

// import FirebaseDataManager from './firebase.dataManager.js'


import './App.css';
import './Assets/RivoliconsWebFont/style.css';
import { Switch, Route} from 'react-router-dom';
import Search from './container/search.container.js';
import Feed from './container/feed.container.js';
import Profile from './container/profile.container.js';
import LoginPage from './container/login.container.js';

class App extends Component {
  constructor(props){
   super(props)
   this.state = {
        user_dp: "https://media.licdn.com/dms/image/C5103AQHS2GnhC9haBw/profile-displayphoto-shrink_800_800/0?e=1529906400&v=beta&t=FZPFq_L6xZSU_Z1Il9EG4mXmbgts17FPxBhJN1Gg97A",
        firstname: "Haiwen",
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
    // this.dataManager = FirebaseDataManager();
    // FirebaseDataManager.getAllCohorts(this.updateCohortState.bind(this))
  }

  componentDidMount(){
    this.getCohorts();
  }

  async getCohorts(){
        this.tasksRef = firebase.database().ref('cohort');
        console.log('Hello')
        await this.tasksRef.ref.on("value", snapshot =>  {
            if(snapshot.val()){
                let cohorts = [];
                console.log('hi');
                let returnedData = snapshot.val();
                for (let key in returnedData) {
                      cohorts.push(returnedData[key].name);
                  }
                this.setState({cohorts:cohorts})
              } else {
              console.log('W??');
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
     /*
     Type: Normal/Admin,
     Cohort: 'Specific Cohort'/ None
     */
    let cohort = state.cohort;
    let type = state.type;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        console.log("Sign Up finished")
        //TODO: FIX THIS
        this.createUser({name: "hi"});

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

    firebase.database().ref().update(updates).then(() => {
        console.log('User added to  Firebase!');
        this.trackUserPresence()
    }).catch((err) => {
        console.log('Data could not be saved. ' + err);
    });
  }


  loggedIn(){
    return(
      <div className="flexRow fullpage">
        <NavigationBar image={this.state.user_dp} firstname={this.state.firstname}/>
          <Switch>
              <Route exact path='/loggedIn/' component={Feed}/>
              <Route path='/loggedIn/search' component={Search}/>
              <Route path='/loggedIn/profile' component={Profile}/>
          </Switch>
      </div>
   );
  }

//<NavigationBar image={this.state.user_dp} firstname={this.state.firstname}/>
  render() {
    console.log(this.state.cohort);
    return (
     <div>
      <Route exact path='/' component={(props) => <LoginPage {...props}  firebaseLogin={this.signUp.bind(this)}/>}/>
      <Route path='/loggedIn' component={this.loggedIn}/>
    </div>
    );
  }
}

export default App;
