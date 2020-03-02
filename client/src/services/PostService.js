import Configuration from '../configuration/Configuration';

class PostService {

  constructor() {
    this.config = new Configuration();
  }

  async retrievePosts() {
    return fetch(this.config.POST_COLLECTION_URL)
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        console.log("Retrieved posts:");
        console.log(json);
        const posts = [];
        const postArray = json._embedded.collectionItems;
        for(var i = 0; i < postArray.length; i++) {
          postArray[i]["link"] =  postArray[i]._links.self.href;
          posts.push(postArray[i]);
        }
        return posts;
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async getPost(postLink) {
    console.log("PostService.getPost():");
    console.log("Post: " + postLink);
    return fetch(postLink,{    method: "GET",mode:"no-cors",headers: {
          "Content-Type": "application/json"
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
    console.log(newPost);
    return fetch(this.config.POST_COLLECTION_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(newPost)
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

  async deletePost(postlink) {
    console.log("PostService.deletePost():");
    console.log("post: " + postlink);
    return fetch(postlink, {
      method: "DELETE",
      mode: "cors"
    })
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
    console.log(post);
    return fetch(post.link, {
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
