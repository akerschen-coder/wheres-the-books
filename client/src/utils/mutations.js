
	// * `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.

	// * `ADD_USER` will execute the `addUser` mutation.

	// * `SAVE_BOOK` will execute the `saveBook` mutation.

	// * `REMOVE_BOOK` will execute the `removeBook` mutation.

import { gql } from '@apollo/client';
// this one dont feel right but I know there needs to be a token thingy somewhere. but where??? 
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      password
      
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($thoughtText: String!, $thoughtAuthor: String!) {
    addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;