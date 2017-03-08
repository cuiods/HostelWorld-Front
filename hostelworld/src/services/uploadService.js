/**
 * Aliyun oss policy service
 */
import {request} from "../utils/request";

export async function getUserPolicy() {
  return request(`/upload/user`, {
    method: `GET`
  })
}

export async function getRoomPolicy() {
  return request(`/upload/room`, {
    method: `GET`
  })
}
