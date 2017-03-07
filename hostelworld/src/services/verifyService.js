/**
 * Created by echo on 16/12/6.
 */
import {request} from '../utils/request';

export async function login(params) {
  return request(`/auth`,{
    method: `POST`,
    body: JSON.stringify({
      username: params.username,
      password: params.password
    })
  });
}
