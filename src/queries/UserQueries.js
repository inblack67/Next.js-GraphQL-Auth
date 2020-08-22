import { gql } from '@apollo/client';

export const loginQuery = gql`
mutation ($email: String!, $password: String!){
    login(email: $email, password: $password){
        name,
        email,
    }
}
`;

export const logoutQuery = gql`
mutation{
    logout{
        email
    }
  }
`;

export const registerQuery = gql`
mutation ($name: String!, $email: String!, $password: String!){
    register(name: $name, email: $email, password: $password){
        name,
        email,
        _id,
    }
}
`;

export const fetchMeQuery = gql`
{
    getMe{
        name,
        email,
        _id,
    }
}
`;