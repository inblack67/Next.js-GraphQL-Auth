import { gql } from '@apollo/client';

export const loginQuery = gql`
mutation ($email: String!, $password: String!){
    login(email: $email, password: $password){
        name,
        email,
    }
}
`;