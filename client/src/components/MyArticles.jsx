import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

export default function MyArticles({showAlert}) {
  
  const [myarticles, setmyarticles] = useState([]);
  async function getArticles() {
    const response = await fetch("http://localhost:5000/home/myposts", {
      method: "GET",
      headers: { token: localStorage.token },
    });

    const parseRes = await response.json();
    parseRes.reverse();
    setmyarticles(parseRes);
    console.log(parseRes);
  }
  function updateApi() {
    getArticles();
  }
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
    <div>
      

      {myarticles.map((ele, key) => {
        return (
          <ArticleCard
            key={key}
            title={ele.article_title}
            content={ele.article_content}
            unique_id={ele.article_id}
            updateApi={() => updateApi()}
            showAlert={showAlert}
          />
        );
      })}


    </div>
  
    </>
  );
}