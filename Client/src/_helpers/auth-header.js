export function getUserToken() {
    let token = localStorage.getItem('user');
    if (token) {
        token = JSON.parse(token).token;
        return token;
    }
    return null;
}