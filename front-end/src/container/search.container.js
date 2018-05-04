import React, { Component } from 'react';
import Contact from '../component/contact.component.js';
import './search.css';

class Search extends Component {
    constructor(prop){
        super(prop)
        this.state = {
                       query: '',
                       search: false
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({query: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        this.setState({search: true});
      }

     showSearch(){
       if(!this.state.search){
         return []
       } else {
         return [
                   <Contact key="1" image={'https://i.imgur.com/A0YeDly.jpg'} email={'haiwen@stanford.edu'} name={'J L'} />,
                   <Contact key="2" image={'https://i.imgur.com/A0YeDly.jpg'} email={'hgui@stanford.edu'} name={'kkiu'} />,
                   <Contact key="3" image={'https://i.imgur.com/A0YeDly.jpg'} email={'g@stanford.edu'} name={'Mg'} />,
                   <Contact key="4" image={'https://i.imgur.com/A0YeDly.jpg'} email={'g@stanford.edu'} name={'Hgu'} />];
                   // <Contact key="5" image={'https://i.imgur.com/A0YeDly.jpg'} email={'k@stanford.edu'} name={'Na'} />,
                   // <Contact key="6" image={'https://i.imgur.com/A0YeDly.jpg'} email={'ku@stanford.edu'} name={'Og'} />,
                   // <Contact key="7" image={'https://i.imgur.com/A0YeDly.jpg'} email={'ku@stanford.edu'} name={'Og'} />,
                   // <Contact key="8" image={'https://i.imgur.com/A0YeDly.jpg'} email={'haiwen@stanford.edu'} name={'J L'} />,
                   // <Contact key="9" image={'https://i.imgur.com/A0YeDly.jpg'} email={'hgui@stanford.edu'} name={'kkiu'} />];
       }
     }

    render() {
        console.log("called");
        return (
           <div className= "flexCol">
            <div className="search flexRow justifyRow">
              <form onSubmit={this.handleSubmit}>
                  <input className="taskinput" type="text" value={this.state.value} onChange={this.handleChange} />
                <input className="searchbtn" type="submit" value="Search" />
              </form>
            </div>
            <div className="contactList">{this.showSearch()}
            </div>
          </div>
        );
    }
}

export default Search;
