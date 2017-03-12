/**
 * hotel related service
 */
import {request} from "../utils/request";

export async function getHotelList(params) {
  return request(`/hotel/list`, {
    method: `POST`,
    body: JSON.stringify({
      page: params.page,
      pageSize: params.pageSize
    })
  })
}

export async function getHotelDetail(params) {
  return request(`/hotel/${params.hotelId}`, {
    method: `GET`
  })
}

export async function createHotel(params) {
  return request(`/hotel`, {
    method: `POST`,
    body: JSON.stringify({
      name: params.name,
      password: params.password,
      phone: params.phone,
      avatar: params.avatar,
      gender: params.gender,
      fullname: params.fullname,
      location: params.location,
      x: params.x,
      y: params.y,
      description: params.description,
      summary: params.summary,
      hotelStar: params.hotelStar,
      picture: params.picture
    })
  })
}

export async function editHotel(params) {
  return request(`/hotel/${params.hotelId}/edit`, {
    method: `PUT`,
    body: JSON.stringify({
      fullname: params.fullname,
      location: params.location,
      x: params.x,
      y: params.y,
      description: params.description,
      summary: params.summary,
      hotelStar: params.hotelStar,
      picture: params.picture
    })
  })
}

export async function getHotelReserves(params) {
  return request(`/hotel/${params.hotelId}/reserve`, {
    method: `GET`
  })
}

export async function getHotelChecks(params) {
  return request(`/hotel/${params.hotelId}/check`, {
    method: `GET`
  })
}

export async function getHotelUnfinishedChecks(params) {
  return request(`/hotel/${params.hotelId}/unfinished`, {
    method: "GET"
  })
}

export async function getHotelRooms(params) {
  return request(`/hotel/${params.hotelId}/room`, {
    method: `GET`
  })
}
