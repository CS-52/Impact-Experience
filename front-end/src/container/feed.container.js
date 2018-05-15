import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Post from '../component/post.component.js'
import './feed.css';

class Feed extends Component {
  constructor(props){
      super(props)
      this.state = {
          selectedOption: 'virgina17',
          user_image: "https://media.licdn.com/dms/image/C5103AQHS2GnhC9haBw/profile-displayphoto-shrink_800_800/0?e=1529906400&v=beta&t=FZPFq_L6xZSU_Z1Il9EG4mXmbgts17FPxBhJN1Gg97A",

    }
  }

  handleChange(newValue){
      this.setState({selectedOption: newValue})
  }

  render() {
    return (
      <div className= "flexCol">
       <div className="feedBar flexRow justifyRow">
        <Select
          className="selectFeed"
          name="form-field-name"
          value={this.state.selectedOption}
          onChange={this.handleChange.bind(this)}
          options={[
              { value: 'virgina17', label: '#Virginia17' },
              { value: 'two', label: 'Two' },
            ]}
        />
       </div>
       <div className="updateBar flexRow justifyRow">
           <div>
              <img className="update_Avatar"
               src={this.state.user_image}/>
           </div>
           <form className="updatePost"onSubmit={this.handleSubmit}>
              <textarea className="postTextArea" value={"Any Updates? Start a Conversation."} onChange={this.handleChange}  />
          </form>
       </div>
       <div className="feed">
               <Post/>
               <Post/>
              <Post/>
       </div>
     </div>
    );
  }
}

export default Feed;
