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
        user,
        _id
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

export const updateStoryQuery = gql`
mutation ($id: ID!, $title: String, $description: String){
    updateStory(id: $id, title: $title, description: $description){
        title,
        description,
        _id,
        user
    }
}
`;

export const deleteStoryQuery = gql`
mutation ($id: ID!){
    deleteStory(id: $id){
        title
    }
}
`;