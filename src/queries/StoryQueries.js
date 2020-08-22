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