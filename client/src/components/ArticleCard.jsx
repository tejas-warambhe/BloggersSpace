import React from "react";

export default function ArticleCard(props) {
  const deleteArticle = async (e) => {
    e.preventDefault();
    const article_id = e.target.name;

    const body = {
      article_id,
    };
    const response = await fetch("https://bloggers-space.herokuapp.com/home/removepost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify(body),
    });
    await response.json();
    // console.log(parseRes);
    props.updateApi();

    props.showAlert("Blog Deleted Succesfully", "danger");
  };
  // const [input, setInput] = useState({
  //   title: props.title,
  //   content: props.content,
  //   id: props.unique_id,
  // });

  

  // const updatePost = async (e) => {
  //   e.preventDefault();
  //   const article_id = input.id;
  //   const article_title = input.title;
  //   const article_content = input.content;
  //   const body = {
  //     article_id,
  //     article_title,
  //     article_content,
  //   };

  //   const response = await fetch("http://localhost:5000/home/edit", {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       token: localStorage.token,
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   const parseRes = await response.json();
  //   // parseRes.reverse();
  //   props.updateApi();
  //   window.location.href = "http://localhost:3000/home";
  // };

  // const onChange = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // };

  return (
    <div key={props.unique_id}>
      <div className="container p-2 shadow">
        <div
          className="card p-2"
          style={{ color: "white", backgroundColor: "#2f2844db" }}
        >
          <div className="row ">
            <div className="col-md-12 px-3">
              <div className="card-block px-6">
                <h1 className="card-title" id="cow">
                  <u>{props.title}</u>
                </h1>
                <hr />
                <p className="card-text" id="p_wrap">{props.content}</p>

                <br />
                <hr />
                <a
                  name={props.unique_id}
                  href="/myarticles"
                  className="mt-auto m-2 btn btn-danger shadow"
                  onClick={(e) => deleteArticle(e)}
                >
                  Delete
                </a>
                {/* <button
                  className="btn btn-warning   m-2 shadow mt-auto"
                  data-toggle="modal"
                  type="button"
                  data-target={`#${props.unique_id}`}
                  onClick={(e) => print(e)}
                  name={props.unique_id}
                >
                  Edit
                </button> */}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
