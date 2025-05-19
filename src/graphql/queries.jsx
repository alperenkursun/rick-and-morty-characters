import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters(
    $page: Int
    $name: String
    $status: String
    $species: String
    $type: String
    $gender: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        status: $status
        species: $species
        type: $type
        gender: $gender
      }
    ) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        species
        gender
        location {
          name
        }
      }
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int, $name: String) {
    locations(page: $page, filter: { name: $name }) {
      results {
        id
        name
        residents {
          id
          name
          species
          image
        }
      }
    }
  }
`;
