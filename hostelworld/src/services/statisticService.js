import {request} from "../utils/request";

export async function getHotelStatistic(params) {
  return request(`/stat/hotel/${params.hotelId}`, {
    method: `GET`
  })
}

export async function getAllStatistic(params) {
  return request(`/stat/all`, {
    method: `GET`
  })
}
