import Configuration from '../configuration/Configuration';

class PostService {

  constructor() {
    this.config = new Configuration();
  }

  async retrievePosts() {
    return fetch(this.config.POST_COLLECTION_URL,{ method: "GET", headers: {
          "Content-Type": "application/json",
      }})
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        console.log("Retrieved posts:");
        console.log(json);
        const posts = json;
        return posts;
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async getPost(postLink) {
    console.log("PostService.getPost():");
    console.log("Post: " + postLink);
    return fetch(postLink,{ method: "GET",mode:"no-cors",headers: {
          "Content-Type": "application/json",
      }})
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .then(post => {
          post["link"] = post._links.self.href;
          return post;
        }
      )
      .catch(error => {
        this.handleError(error);
      });
  }

  async createPost(newPost) {
    console.log("PostService.createPost():");
    console.log(JSON.stringify(newPost));
    return fetch(this.config.POST_COLLECTION_URL,  {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(newPost)
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
            this.handleResponseError(response);
        }
        console.log("Happy");
        // return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async deletePost(id) {
    console.log("PostService.deletePost():");
    this.ID = {"ID": 5};

    const formData = new FormData();
    formData.append('first_name', "Asdfsdfa");
    console.log(this.config.POST_URL+ id);
    return fetch(this.config.POST_URL + id, {method: "DELETE"})
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async updatePost(post) {
    console.log("PostService.updatePost():");
        console.log(JSON.stringify(post));
        console.log(this.config.POST_URL + post.id);
    return fetch(this.config.POST_URL + post.id, {
      method: "PUT",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
          },
      body: JSON.stringify(post)
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

export default PostService;
