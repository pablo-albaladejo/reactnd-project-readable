
import React, { Component } from 'react';

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, 
    //Button
} from 'reactstrap';

class PostDetails extends Component {

    render() {
        let post = this.props.item;
        return (
            <div>
                {post && (
                    <Card>
                        <CardBody>
                            <CardTitle>{post.title}</CardTitle>
                            <CardSubtitle>{post.author}</CardSubtitle>
                            <CardText>{post.body}</CardText>
                            {/* <Button>Button</Button> */}
                        </CardBody>
                    </Card>
                )}
            </div>
        );
    }
}
export default PostDetails;
