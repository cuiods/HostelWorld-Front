/**
 * Account service
 */
import {request} from "../utils/request";
export async function getAvailableAccounts(params) {
  return request(`/account/${params.userId}`, {
    method: 'GET',
    body: JSON.stringify({
      score: params.score
    })
  })
}
