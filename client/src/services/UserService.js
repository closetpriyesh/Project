import Configuration from '../configuration/Configuration';
import history from "../history";
class UserService {

  constructor() {
    this.config = new Configuration();
    this.fireRedirect = false;
  }

  async retrieveUsers() {
    return fetch(this.config.USER_URL,{ method: "GET", headers: {
          "Content-Type": "application/json",
      }})
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }

        // return response.json();


      })
      .then(json => {
        console.log("Retrieved users:");
        console.log(json);
        const users = json;
        return users;
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async getUser(userLink) {
    console.log("UserService.getUser():");
    console.log("User: " + userLink);
    return fetch(userLink,{ method: "GET",mode:"no-cors",headers: {
          "Content-Type": "application/json",
      }})
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .then(user => {
          user["link"] = user._links.self.href;
          return user;
        }
      )
      .catch(error => {
        this.handleError(error);
      });
  }


  async createUser(newUser) {
    console.log("UserService.createUser():");
    console.log(JSON.stringify(newUser));
    return fetch(this.config.USER_COLLECTION_URL,  {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(newUser)
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            this.handleResponseError(response);
        }

        history.push('/');
        // return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }


  async deleteUser(id) {
    console.log("UserService.deleteUser():");
    this.ID = {"ID": 5};

    const formData = new FormData();
    formData.append('first_name', "Asdfsdfa");
    console.log(this.config.USER_URL+ id);
    return fetch(this.config.USER_URL + id, {method: "DELETE"})
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async updateUser(user) {
    console.log("UserService.updateUser():");
        console.log(JSON.stringify(user));
        console.log(this.config.USER_URL + user.id);
    return fetch(this.config.USER_URL + user.id, {
      method: "PUT",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
          },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  handleResponseError(response) {
      throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
      console.log(error.message);
  }

}

export default UserService;
