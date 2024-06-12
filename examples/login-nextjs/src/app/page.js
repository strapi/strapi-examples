  import HomeComponent from "./home.front"

  export default async (props) => {
    return <HomeComponent backendUrl={ process.env.REACT_APP_BACKEND_URL } />
  }


