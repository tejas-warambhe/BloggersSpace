import React, { useEffect, useState } from "react";

export default function AllArticles() {
  const [articles, setarticles] = useState([]);

  async function getAllArticles() {
    const response = await fetch("http://localhost:5000/home/posts", {
      method: "GET",
      headers: {
        token: localStorage.token,
      },
    });

    const parseRes = await response.json();
    parseRes.reverse();
    setarticles(parseRes);

    console.log(parseRes, "here");
  }

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <div>
      {articles.map((ele, key) => {
        return (
          <div className="container py-2" key={key}>
            <div className="card">
              <div className="row ">
                <div className="col-md-12 px-3">
                  <div className="card-block px-6">
                    <h4 className="card-title">{ele.article_title}</h4>
                    <blockquote>{ele.user_name}</blockquote>
                    <p className="card-text">{ele.article_content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
