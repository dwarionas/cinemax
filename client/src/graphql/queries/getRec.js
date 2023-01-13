import { gql } from "@apollo/client";

export const getRec = gql`
    query {
        getRec {
            title
            id
            poster_path
        }
    }
`