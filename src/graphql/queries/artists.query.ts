import { gql } from "@apollo/client";

export class ArtistsQuery {
  static getArtistsQuery() {
    return gql`
      query {
        getArtists {
          id
          name
          genre
          genres
          bio
          image
          city
          location
          languages
          feeRange
          price
          rating
          managerId
          manager {
            id
            name
            email
          }
          createdAt
        }
      }
    `;
  }

  static getArtistByIdQuery(id: string) {
    return gql`
      query {
        getArtist(id: "${id}") {
          id
          name
          genre
          genres
          bio
          image
          city
          location
          languages
          feeRange
          price
          rating
          managerId
          manager {
            id
            name
            email
          }
          createdAt
        }
      }
    `;
  }

  static searchArtistsQuery(query: string) {
    return gql`
      query {
        searchArtists(query: "${query}") {
          id
          name
          genre
          genres
          bio
          image
          city
          location
          languages
          feeRange
          price
          rating
          managerId
          manager {
            id
            name
            email
          }
          createdAt
        }
      }
    `;
  }

  static createArtistMutation() {
    return gql`
      mutation CreateArtist($input: CreateArtistInput!) {
        createArtist(input: $input) {
          id
          name
          genres
          bio
          image
          location
          languages
          feeRange
          price
          rating
          managerId
          manager {
            id
            name
            email
          }
          createdAt
        }
      }
    `;
  }

  static updateArtistMutation() {
    return gql`
      mutation UpdateArtist($id: ID!, $input: CreateArtistInput!) {
        updateArtist(id: $id, input: $input) {
          id
          name
          genres
          bio
          image
          location
          languages
          feeRange
          price
          rating
          managerId
          manager {
            id
            name
            email
          }
          createdAt
        }
      }
    `;
  }
}
