// authEndpoints.ts
const AuthBase = "/auth";

const AuthEndpoint = {
  login: `${AuthBase}/login`,
  logout: `${AuthBase}/logout`,
  refresh: `${AuthBase}/refresh`,
  me: `${AuthBase}/me`,
};

export default AuthEndpoint;
