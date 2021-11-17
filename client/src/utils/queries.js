import gql from 'graphql-tag';

export const GET_ME = gql`
query {
    me {
        username
        email
        SavedBooks {
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