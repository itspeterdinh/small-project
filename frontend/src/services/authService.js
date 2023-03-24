import httpService from './httpService';

const apiEndPoint = '/users/login';
const tokenKey = 'token';

httpService.setJwt(getJwt());

export async function login(email, password) {
  console.log('Hello');
  try {
    const {
      data: { status, data },
    } = await httpService.post(apiEndPoint, {
      email: email,
      password: password,
    });

    if (status === 'success') {
      window.localStorage.setItem('user', JSON.stringify(data.user));
    }
  } catch (err) {
    console.log(err);
  }
}

export function jwtLogin(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  window.localStorage.removeItem('user');
}

export function getCurrentUser() {
  try {
    return localStorage.getItem('user');
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  jwtLogin,
  logout,
  getCurrentUser,
  getJwt,
};

export default auth;
