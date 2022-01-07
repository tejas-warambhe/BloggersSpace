import React, { useEffect, useState } from "react";

export default function AllArticles() {
  const [articles, setarticles] = useState([]);

  async function getAllArticles() {
    const response = await fetch("https://bloggers-space.herokuapp.com/home/posts", {
      method: "GET",
      headers: {
        token: localStorage.token,
      },
    });

    const parseRes = await response.json();
    parseRes.reverse();
    

    setarticles(parseRes);

  
  }

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <div>
      {articles.map((ele, key) => {
        return (
          <div className="container py-3 shadow " key={key}>
            <div className="card p-2" style={{color:"white", backgroundColor: "#2f2844db"}}>
              <div className="row ">
                <div className="col-md-12 px-3">
                  <div className="card-block px-6">
                    <div className="row">
                      <div className="col">
                        <h4 className="card-title">{ele.article_title}</h4>
                      </div>
                      <div className="col" style={{textAlign: "right", right:"5px"}}>
                        
                        <div className="card-title">
                          <figcaption className="blockquote-footer" style={{color: "white"}}>
                            {ele.user_name}
                          </figcaption>
                        </div>
                      </div>
                    </div>
                    <hr/>
                    
                    <p className="card-text" id="p_wrap">{ele.article_content}</p>
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
