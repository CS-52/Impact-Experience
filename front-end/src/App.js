import React, { Component } from 'react';
import logo from './logo.svg';
import NavigationBar from './component/navigation.component.js';
import './App.css';
import './Assets/RivoliconsWebFont/style.css';
import { Switch, Route} from 'react-router-dom';
import Search from './container/search.container.js';
import Feed from './container/feed.container.js';

class App extends Component {
  constructor(props){
   super(props)
   this.state = {
        user_dp: "https://media.licdn.com/dms/image/C5103AQHS2GnhC9haBw/profile-displayphoto-shrink_800_800/0?e=1529906400&v=beta&t=FZPFq_L6xZSU_Z1Il9EG4mXmbgts17FPxBhJN1Gg97A",
        firstname: "Haiwen"
    }
  }
  render() {
    return (
      <div className="flexRow fullpage">
        <NavigationBar image={this.state.user_dp} firstname={this.state.firstname}/>
          <Switch>
              <Route exact path='/' component={Feed}/>
              <Route path='/search' component={Search}/>
          </Switch>
      </div>
    );
  }
}

export default App;
