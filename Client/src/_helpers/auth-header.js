export function getUserToken() {
    let token = localStorage.getItem('user');
    token = JSON.parse(token).token;
    return token;
}