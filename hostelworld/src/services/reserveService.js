/**
 * hotel reservation service
 */
import {request} from "../utils/request";

export async function reserve(params) {
  return request(`/reserve`, {
    method: `POST`,
    body: JSON.stringify({
      roomId: params.roomId,
      memberId: params.memberId,
      start: params.start,
      end: params.end,
      name: params.name,
      contact: params.contact,
      extra: params.extra
    })
  })
}

export async function cancelReservation(params) {
  return request(`reserve/${params.reserveId}/cancel`, {
    method: `POST`
  })
}
