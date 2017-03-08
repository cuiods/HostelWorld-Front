/**
 * check in record service
 */
import {request} from "../utils/request";

export async function checkIn(params) {
  return request(`/check`, {
    method: `POST`,
    body: JSON.stringify({
      roomId: params.roomId,
      memberId: params.memberId,
      start: params.start,
      end: params.end,
      tenants: params.tenants
    })
  })
}

export async function checkout(params) {
  return request(`/check/${params.id}/checkOut`, {
    method: `POST`,
    body: JSON.stringify({
      memberId: params.memberId,
      payway: params.payway
    })
  })
}


export async function addTenant(params) {
  return request(`/check/tenant/${params.id}`, {
    method: `POST`,
    body: JSON.stringify({
      name: params.name,
      phone: params.phone,
      idCard: params.idCard
    })
  })
}


export async function deleteTenant(params) {
  return request(`/check/tenant/${params.id}`, {
    method: `DELETE`
  })
}
