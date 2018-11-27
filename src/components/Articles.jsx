import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import PostArticle from "./PostArticle";
import Vote from "./Vote";

export default class Articles extends Component {
  state = {
    articles: [],
    loading: true
  };
  render() {
    return (
      <div>
        <PostArticle addArticle={this.addArticle} user={this.props.user} />
        <section>
          <h1>Articles</h1>
          {this.state.loading ? (
            <h2>Loading...</h2>
          ) : (
            <div>
              {this.state.articles.map(article => {
                return (
                  <div className="articles" key={article._id}>
                    <div>
                      <Link to={`/articles/${article._id}`} className="link">
                        {article.title}
                      </Link>

                      <p className="article-body">{article.body}</p>
                    </div>
                    {/* <Vote
                      votes={article.votes}
                      _id={article._id}
                      section={"articles"}
                    /> */}

                    {/* <Link
                      to={`/articles/${article._id}/comments`}
                      className="link"
                    >
                      <p className="comments">
                        Comments <i className="fas fa-comment" />
                      </p>
                    </Link> */}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props.topic);
    console.log("mounted");
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    if (prevProps.topic !== topic) this.fetchArticles();
  }

  fetchArticles = () => {
    const { topic } = this.props;
    api.getArticles(topic).then(articles => {
      console.log(articles);
      this.setState({
        articles: articles,
        loading: false
      });
    });
  };

  addArticle = newArticle => {
    this.setState({ articles: [newArticle, ...this.state.articles] });
  };
}
