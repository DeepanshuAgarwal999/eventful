import { gql } from "@apollo/client";

export class BookingsQuery {
  static getBookingsQuery() {
    return gql`
      query {
        getBookings {
          id
          eventPlannerId
          artistId
          eventName
          eventDate
          price
          status
          message
          createdAt
          eventPlanner {
            id
            name
            email
            company
            phone
          }
          artist {
            id
            name
            genre
            image
            city
            rating
          }
        }
      }
    `;
  }
  static getBookingByIdQuery(id: string) {
    return gql`
      query {
        getBooking(id: "${id}") {
          id
          eventPlannerId
          artistId
          eventName
          eventDate
          price
          status
          message
          createdAt
          eventPlanner {
            id
            name
            email
            company
            phone
          }
          artist {
            id
            name
            genre
            image
            city
            rating
          }
        }
      }
    `;
  }
  static getMyBookingsQuery() {
    return gql`
      query {
        getMyBookings {
          id
          eventPlannerId
          artistId
          eventName
          eventDate
          price
          status
          message
          createdAt
          eventPlanner {
            id
            name
            email
            company
            phone
          }
          artist {
            id
            name
            genre
            image
            city
            rating
          }
        }
      }
    `;
  }

  static updateBookingStatusMutation() {
    return gql`
      mutation UpdateBookingStatus($id: ID!, $status: BookingStatus!) {
        updateBookingStatus(id: $id, status: $status) {
          id
          status
          eventName
          eventDate
          price
          artist {
            id
            name
          }
          eventPlanner {
            id
            name
            email
          }
        }
      }
    `;
  }
  static getManagerBookingsQuery() {
    return gql`
      query GetManagerBookings {
        getBookings {
          id
          artistId
          eventName
          eventDate
          price
          status
          message
          createdAt
          artist {
            id
            name
            genre
            image
            city
            rating
          }
        }
      }
    `;
  }

  static createBookingMutation() {
    return gql`
      mutation CreateBooking($input: CreateBookingInput!) {
        createBooking(input: $input) {
          id
          eventPlannerId
          artistId
          eventName
          eventDate
          price
          status
          message
          createdAt
          eventPlanner {
            id
            name
            email
            company
            phone
          }
          artist {
            id
            name
            genre
            image
            city
            rating
          }
        }
      }
    `;
  }
}
