import { LoginRedirectFront } from "./login-redirect.front";

export default async function (req, res) {

  return <LoginRedirectFront 
    backendUrl={ process.env.REACT_APP_BACKEND_URL }
  />
}

