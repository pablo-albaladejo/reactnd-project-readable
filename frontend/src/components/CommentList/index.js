
import React, { Component } from 'react';

import {
    Card, CardText, CardBody,
    CardSubtitle,
    //Button
} from 'reactstrap';

import { connect } from 'react-redux';

class CommentList extends Component {

    render() {
        let comments = this.props.item;
        return (
            <div>
                {comments.map((comment,index) => {
                    return (
                        <Card key={index}>
                            <CardBody>
                                <CardSubtitle>{comment.author}</CardSubtitle>
                                <CardText>{comment.body}</CardText>
                                {/* <Button>Button</Button> */}
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        );
    }
}
export default connect()(CommentList);