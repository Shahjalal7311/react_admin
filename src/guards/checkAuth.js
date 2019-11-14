export default function checkAuth() {
  return new Promise((resolve, reject) => {
    const user = localStorage.getItem('user');
    if (user) {
        resolve(user);
    } else {
        reject('/login');
    }
  });
}