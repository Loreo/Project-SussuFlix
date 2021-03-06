const users = [
  {
    "user": "matthiosso",
    "password": "92"
  },
  {
    "user": "loreo",
    "password": "92"
  },
  {
    "user": "loulou",
    "password": "94"
  }
];

module.exports = {

  login(username, password, cb) {
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return
    }
    pretendRequest(username, password, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true);
        this.onChange(true)
      } else {
        if (cb) cb(false);
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
};

function pretendRequest(username, password, cb) {
  setTimeout(() => {
    if (users.reduce(function(a,b) {
        return a || (b.user === username && b.password === password);
      }, false)) {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}