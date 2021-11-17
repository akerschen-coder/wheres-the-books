import gql from 'graphql-tag';

export const GET_ME = gql`
query {
    me {
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;