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

export const addStoryQuery = gql`
mutation ($title: String!, $description: String!){
    addStory(title: $title, description: $description){
        title,
        description,
        _id,
        user
    }
}
`;