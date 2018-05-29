import {
    UPDATE_COMMENT_VOTESCORE,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    ADD_COMMENT,
} from './actionTypes';

import ServiceFacade from '../services/ServiceFacade';

//update comment voteScore
export const updateCommentVoteScore = (commentId, upVote) => dispatch => (
    ServiceFacade.updateCommentVoteScore(commentId, upVote)
        .then(comment => {
            dispatch(updateCommentVoteScoreSync(comment));
        }).catch(err => {
            console.warn(err);
        })
);
export function updateCommentVoteScoreSync(comment) {
    return {
        type: UPDATE_COMMENT_VOTESCORE,
        comment,
    }
}

//delete comment
export const deleteComment = (commentId) => dispatch => (
    ServiceFacade.deleteComment(commentId)
        .then(comment => {
            dispatch(deleteCommentSync(comment));
        }).catch(err => {
            console.warn(err);
        })
);
export function deleteCommentSync(comment) {
    return {
        type: DELETE_COMMENT,
        comment,
    }
}

//update comment
export const updateComment = (commentId, data) => dispatch => (
    ServiceFacade.updateComment(commentId, data)
        .then(comment => {
            dispatch(updateCommentSync(comment));
        }).catch(err => {
            console.warn(err);
        })
);
export function updateCommentSync(comment) {
    return {
        type: UPDATE_COMMENT,
        comment,
    }
}

//add comment
export const addComment = (postId, data) => dispatch => (
    ServiceFacade.addComment(postId, data)
        .then(comment => {
            dispatch(addCommentSync(comment));
        }).catch(err => {
            console.warn(err);
        })
);
export function addCommentSync(comment) {
    return {
        type: ADD_COMMENT,
        comment,
    }
}