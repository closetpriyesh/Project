import Configuration from '../configuration/Configuration';
const passport = require("passport");
class GoogleService {

  constructor() {
    this.config = new Configuration();
  }

  async authenticateUser() {
    return fetch("http://localhost:5000/auth/google",{ mode: "cors",headers: {
            "Access-Control-Allow-Origin": "*"
          }})
      .then(response => {
        console.log(response);
        console.log("back");
        if (!response.ok) {
          console.log("Error");
        }
      })

    }
}


export default GoogleService;
