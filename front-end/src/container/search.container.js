import React, { Component } from 'react';
import Contact from '../component/contact.component.js';
import './container_css/search.css';

import * as firebase from 'firebase';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Search extends Component {
    constructor(prop){
        super(prop)
        this.state = {
                        feed_cohort: this.props.cohort,
                        all_cohorts: [
                            { value: 'virgina17', label: '#Virginia17' },
                            { value: 'puterico19', label: 'Puterico19' },
                        ],
                        contacts: "",
                       search: false
                     };

      }

    //Cohort Helpers
    arrayToReactSelectOptions(cohortsArray){
        let options = [];
        for (let i in cohortsArray){
            let option = {value: cohortsArray[i], label: cohortsArray[i]}
            options.push(option);
        }
        return options
    }

    getCohortID(cohortvalue, all_cohorts){
        console.log(cohortvalue);
        for (let i in all_cohorts){
            console.log(all_cohorts[i].value);
            if (all_cohorts[i].value === cohortvalue){
                return i;
            }
            console.log('Cohort ID left');
        }
    }


    componentDidMount(){
        //Refs
        this.cohortRef = firebase.database().ref('cohort');
        this.getCohorts();
        this.contactsRef = firebase.database().ref('contacts');
    }


    componentWillUnmount(){
        //Refs
        this.cohortRef.off()
        this.cohortRef = null;
        this.contactsRef.off()
        this.contactsRef = null;
    }


    async getContacts(cohortValue, all_cohorts){
        let cohortID = this.getCohortID(cohortValue, all_cohorts);
        await this.contactsRef.child(cohortID).ref.on("value", snapshot =>  {
            if(snapshot.val()){
                let contactData = [];
                let returnedData = snapshot.val();
                for (let key in returnedData) {
                    let contactAdd = returnedData[key];
                    contactAdd.contactID = key;
                    contactData.push(contactAdd);
                }
                this.setState({contacts: contactData})
            } else {
            }
        });
    }


    async getCohorts(){
        await this.cohortRef.ref.on("value", snapshot =>  {
            if(snapshot.val()){
                let cohorts = [];
                let returnedData = snapshot.val();
                for (let key in returnedData) {
                    cohorts.push(returnedData[key]);
                }
                let newCohorts = this.arrayToReactSelectOptions(cohorts);
                this.setState({all_cohorts: newCohorts});
                this.getContacts(this.state.feed_cohort, newCohorts);
            } else {
            }
        });
    }


    selectFeedCohort(newValue){
        this.setState({feed_cohort: newValue.value})
        this.contactsRef.off();
        this.contactsRef = null;
        this.contactsRef = firebase.database().ref('contacts');

        // this.getNewPosts = true;
        this.getContacts(newValue.value, this.state.all_cohorts);
        //Send backend request
        //Start spinner till then
    }


     showSearch(){
         let contact = [];
         for (let i in this.state.contacts){
             contact.push(<Contact key={this.state.contacts[i].contactID}
                                     image={this.state.contacts[i].dp}
                                     email={this.state.contacts[i].email}
                                     name={this.state.contacts[i].name} />);
         }
         return contact;
     }

    render() {
        return (
            <div className= "flexCol height_cont">
                <div className="search flexRow justifyRow">
                    <Select
                        className="selectFeed postFont greyFont"
                        name="form-field-name"
                        value={this.state.feed_cohort}
                        onChange={this.selectFeedCohort.bind(this)}
                        options={this.state.all_cohorts}
                    />
                </div>
                <div className="contactList">{this.showSearch()}
                </div>
            </div>
        );
    }
}

export default Search;
