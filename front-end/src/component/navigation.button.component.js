import React, { Component } from 'react';
import './component_css/navigation_button.css'



class NavigationButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            selected: this.props.selected,
            buttonID: this.props.buttonIndex,
        }
        //recieve a click call back function
        this.select = this.select.bind(this);
    }
    componentWillReceiveProps(props){
        if(props.selected === true && this.state.selected === false){
            //toggle
            this.setState({selected: props.selected});
        } else if(props.selected === false && this.state.selected === true){
            //toggle
            this.setState({selected: props.selected});
        }
    }

    select(){
        this.props.selectCallBack(this.state.buttonID);
    }

    render(){
        console.log(this.state.selected);
        if (this.state.selected){
            console.log('Break of day')
            return(
                <div onClick={this.select} id="navigation-container" data-button-id={this.state.buttonID} className="flexRow selected_bar">
                    <div className="text-container-base flexRow" >
                        <div className="font"> {this.state.name}</div>
                    </div>
                </div>
            );
        }

        return(
            <div onClick={this.select} id="navigation-container" data-button-id={this.state.buttonID} className="flexRow">
                <div className="text-container-base flexRow" >
                    <div className="font"> {this.state.name}</div>
                </div>
            </div>
        );
    }
}

export default NavigationButton;