import React from "react";
import axios from "axios";

import "./App.css";

class App extends React.Component {
  // const [state, setState ] = userS
  state = {
    title: "",
    body: "",
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    //axios.get("http://localhost/api")  --> axios.get("/api");,
    // because of the "proxy": "http://localhost:8080"
    //https://create-react-app.dev/docs/proxying-api-requests-in-development/

    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Data has been received!");
      })
      .catch(() => {
        console.log("Error retrieving data!");
      });
  };
  //e.target -> {target}, so using shorthand now
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });

    // const name = target.name;
    // const value = target.value;
    // // console.log(`name: ${name} value: ${value}`);
  };

  //Function
  // Axios is called when submit is clicked
  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      // url: "http://localhost:8080/api/save",
      url: "/api/save",
      method: "POST",
      data: payload
    })
      .then(() => {
        console.log("Data has been sent to the sever");
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  resetUserInputs = () => {
    this.setState({
      title: "",
      body: ""
    });
  };

  displayBlogPost = (posts) => {
    console.log(`calling displayBlogPost()..size of posts: ${posts.length}`);
    console.log(posts);
    //if empty reutrn null
    if (!posts.length) return null;

    return posts.map((posts, index) => (
      <div key={index} className="blog-post__display">
        <h3>{posts.title}</h3>
        <p>{posts.body}</p>
      </div>
    ));
  };

  render() {
    console.log("State:", this.state);

    return (
      <div className="app">
        <h1> Wecome to the bloggin App </h1>
        <h1>Timestamp: {Date.now()}</h1>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-input">
            <textarea
              name="body"
              placeholder="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <button>Submit</button>
        </form>

        {/* <h1>before</h1> */}
        <div className="blog-">{this.displayBlogPost(this.state.posts)}</div>
        {/* <h1>after</h1> */}
      </div>
    );
  }
}

export default App;
