import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllArticles from "./AllArticles";


export default function Home({ setAuth }) {
  const [name, setName] = useState("");
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/home", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();

      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { title, content } = post;
    const article_content = content;
    const article_title = title;
    const user_name = name;
    const body = {
      article_title,
      article_content,
      user_name
    };
    const response = await fetch("http://localhost:5000/home/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    console.log(parseRes);
    console.log("submit data to backend");
    setPost({
      title: "",
      content: "",
    });
    window.location.href = "http://localhost:3000/myarticles";
  };

  useEffect(() => {
    getName();
  }, []);

  const clearLocal = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div>
      
      <div className="card container float-right" style={{width: "18%"}}>
        <div className="card-body">
        <div className="container">
        <h5 style={{ color: "Grey" }}>
        <b >Welcome <strong>{name}</strong>!</b>
      </h5>
      <Link to="/myarticles" className="btn btn-info shadow" role="button">My Articles</Link>
        <button
          type="button"
          className="btn btn-success btn mx-2 shadow"
          data-toggle="modal"
          data-target="#form"
        >
          Publish
        </button>
        
        <button
          className="btn btn-danger btn  shadow mt-2"
          onClick={(e) => clearLocal(e)}
        >
          Logout
        </button>
      </div>
        </div>
      </div>
      
      <div className="container"></div>

      <div
        className="modal fade"
        id="form"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h3 className="modal-title" id="exampleModalLabel">
                Create a blog of your own!
              </h3>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="email1">Blog Title</label>
                  <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                    id="email1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email1">Blog Content</label>
                  <textarea
                    value={post.content}
                    onChange={(e) => onChange(e)}
                    name="content"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="20"
                    placeholder="Start typing.."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer border-top-0 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={(e) => onSubmitForm(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {<AllArticles />}
    </div>
  );
}
