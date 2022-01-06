import React, {  useState } from "react";

export default function ArticleCard(props) {
  const deleteArticle = async (e) => {
    e.preventDefault();
    const article_id = e.target.name;

    const body = {
      article_id,
    };
    const response = await fetch("http://localhost:5000/home/removepost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    props.updateApi();
    console.log(parseRes);
  };
  const [input, setInput] = useState({
    title: props.title,
    content: props.content,
    id: props.unique_id
  });
  const {id} = input;
  function print(e) {
    e.preventDefault();
    const article_id = e.target.name;
    const article_title = input.title;
    const article_content = input.content;
    const body = {
      article_id,
      article_title,
      article_content,
    };

    console.log(body);
  }

  const updatePost = async (e) => {
    e.preventDefault();
    const article_id = e.target.name;
    const article_title = input.title;
    const article_content = input.content;
    const body = {
      article_id,
      article_title,
      article_content,
    };
    console.log(body);
    const response = await fetch("http://localhost:5000/home/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    // parseRes.reverse();
    props.updateApi();
    window.location.href = "http://localhost:3000/home";
    console.log(parseRes.rows);
  };

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  console.log(props.id);
  return (
    <div key={props.id}>
      <div className="container py-2">
        <div className="card">
          <div className="row ">
            <div className="col-md-12 px-3">
              <div className="card-block px-6">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text">{props.content}</p>

                <br />
                <a
                  name={input.id}
                  href="/myarticles"
                  className="mt-auto btn btn-danger shadow"
                  onClick={(e) => deleteArticle(e)}
                >
                  Delete
                </a>
                <button
                  className="btn btn-warning  mx-2 shadow mt-auto"
                  data-toggle="modal"
                  type="button"
                  data-target={`#${input.id}`}
                  onClick={(e) => print(e)}
                  name={input.id}
                >
                  Edit
                </button>
                
              </div>
              <div
                  className="modal fade"
                  id={`${input.id}`}
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
                          Update Your Blog!
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
                              onChange={(e) => onChange(e)}
                              value={input.title}
                              className="form-control"
                              id=""
                              aria-describedby="emai"
                              placeholder="Enter Title"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email1">Blog Content</label>
                            <textarea
                              value={input.content}
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
                          <a
                            type="submit"
                            className="btn btn-success"
                            data-dismiss="modal"
                            href="/home"
                            name={props.unique_id}
                            onClick={(e) => updatePost(e)}
                          >
                            Save Changes
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
