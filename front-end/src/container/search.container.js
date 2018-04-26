import React, { Component } from 'react';
import Contact from '../component/contact.component.js';
import './search.css';

class Search extends Component {
    constructor(prop){
        super(prop)
        this.state = {query: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({query: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
      }

    render() {
        return (
           <div className= "flexCol">
            <div className="searchBar">
              <form onSubmit={this.handleSubmit}>
                  <input className="taskinput" type="text" value={this.state.value} onChange={this.handleChange} />
                <input className="searchbtn" type="submit" value="Search" />
              </form>
            </div>
            <div className="contactList">
            <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'haiwen@stanford.edu'} name={'J L'} />
            <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'hgui@stanford.edu'} name={'kkiu'} />
            <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'g@stanford.edu'} name={'Mg'} />
            <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'g@stanford.edu'} name={'Hgu'} />
            <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'k@stanford.edu'} name={'Na'} />
            <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'ku@stanford.edu'} name={'Og'} />
            <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'ku@stanford.edu'} name={'Og'} />

            <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'haiwen@stanford.edu'} name={'J L'} />
            <Contact image={'https://i.imgur.com/A0YeDly.jpg'} email={'hgui@stanford.edu'} name={'kkiu'} />

            </div>
          </div>
        );
    }
}

export default Search;
