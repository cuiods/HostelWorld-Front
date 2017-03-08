/**
 * member service
 */
import {request} from "../utils/request";
export async function getMemberList(params) {
  return request(`/member/list`, {
    method: `POST`,
    body: JSON.stringify({
      page: params.page,
      pageSize: params.pageSize
    })
  })
}

export async function getMemberInfo(params) {
  return request(`/member/${params.memberId}`, {
    method: `GET`
  })
}

export async function createMember(params) {
  return request(`/member`, {
    method: `POST`,
    body: JSON.stringify( {
      name: params.name,
      password: params.password,
      phone: params.phone,
      avatar: params.avatar,
      gender: params.gender,
      description: params.description
    } )
  })
}

export async function editMember(params) {
  return request(`/member/edit`, {
    method: `PUT`,
    body: JSON.stringify({
      memberId: params.memberId,
      password: params.password,
      avatar: params.avatar,
      gender: params.gender,
      description: params.description
    })
  })
}

export async function transferToRemain(params) {
  return request(`/member/recharge`, {
    method: `POST`,
    body: JSON.stringify({
      memberId: params.memberId,
      accountId: params.accountId,
      money: params.money
    })
  })
}

export async function stopMember(params) {
  return request(`/member/${params.memberId}/stop`, {
    method: `POST`
  })
}

export async function exchangeScore(params) {
  return request(`/member/${params.memberId}/exchange`, {
    method: `POST`,
    body: JSON.stringify({
      score: params.score
    })
  })
}

export async function getMemberReserves(params) {
  return request(`/member/${params.memberId}/reserve`, {
    method: `GET`
  })
}

export async function getMemberChecks(params) {
  return request(`/member/${params.memberId}/check`, {
    method: `GET`
  })
}

export async function getMemberConsumeRecords(params) {
  return request(`/member/${params.memberId}/consume`, {
    method: `GET`
  })
}
