/**
 * room service
 */
import {request} from "../utils/request";

export async function createRoom(params) {
  return request(`/room`, {
    method: `POST`,
    body: JSON.stringify({
      hotelId: params.hotelId,
      roomType: params.roomType,
      size: params.size,
      people: params.people,
      bedType: params.bedType,
      description: params.description,
      number: params.number,
      price: params.price,
      start: params.start,
      end: params.end
    })
  })
}

export async function getRoomDetail(params) {
  return request(`/room/${params.roomId}`, {
    method: `POST`,
    body: JSON.stringify({
      start: params.start,
      end: params.end
    })
  })
}

export async function getUnfinishedChecks(params) {
  return request(`/room/${params.roomId}/unfinished`, {
    method: `GET`
  })
}
