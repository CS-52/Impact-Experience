class TimeList extends Component{
    constructor(props){
        super(props);
        this.state = {
            timeEnd: this.props.n,
        }
    }
    //12/24 60
    render(){
        let timeLi = [];
        for (let i = 0; i <= this.state.timeEnd; i++ ){
            timeLi.push(<div key={i} className="">{i}</div>)
        }
        return(
            <div>{timeLi}</div>
        );
    }
}


