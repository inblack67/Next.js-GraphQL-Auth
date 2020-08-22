import { gql } from '@apollo/client';

export const fetchStoriesQuery = gql`
{
    stories{
        _id,
        title,
        description,
        user,
        createdAt
    }
}
`;

export const fetchSingleStoryQuery = gql`
query ($id: ID!){
    story(id: $id){
        title,
        description
        createdAt
        user
    }
}
`;