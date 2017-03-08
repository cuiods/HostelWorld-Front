/**
 * manager service
 */
import {request} from "../utils/request";

export async function getHotelsToApprove() {
  return request(`/manager/hotel/new`, {
    method: `GET`
  })
}

export async function approveHotel(params) {
  return request(`/manager/hotel/new/${params.approveId}`, {
    method: `POST`
  })
}

export async function getHotelsEdited() {
  return request(`/manager/hotel/edit`, {
    method: `GET`
  })
}

export async function approveEdit(params) {
  return request(`/manager/hotel/edit/${params.approveId}`, {
    method: `POST`
  })
}

export async function getUncompletedChecks() {
  return request(`/manager/check/complete`, {
    method: `GET`
  })
}

export async function approveCheck(params) {
  return request(`/manager/check/complete/${params.approveId}`, {
    method: `POST`
  })
}

export async function approveChecks(params) {
  return request(`/manager/check/complete`, {
    method: `POST`,
    body: JSON.stringify({
      checkIds: params.checkIds
    })
  })
}

