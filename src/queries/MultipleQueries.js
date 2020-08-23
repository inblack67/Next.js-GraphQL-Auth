import { gql } from '@apollo/client';

export const fetchStoryAndUser = gql`
query ($id: ID!){
    story(id: $id){
        title,
        description
        createdAt
        user
    }
    getMe{
        name,
        email,
        _id,
    }
}
`;