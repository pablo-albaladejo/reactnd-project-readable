import React, { Component } from 'react';

class VoteScore extends Component {    

    render(){
        return(
            <div>
                <i className="fa fa-arrow-up" onClick={() => this.props.onUpVote(this.props.id)}/>
                {this.props.value}
                <i className="fa fa-arrow-down" onClick={() => this.props.onDownVote(this.props.id)}/>
            </div>
        );
    }
}
export default VoteScore;