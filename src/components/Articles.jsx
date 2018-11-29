import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import PostArticle from "./PostArticle";
import Vote from "./Vote";
import formatDate from "./utils/formatDate";

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
          {this.state.loading ? (
            <h2>Loading...</h2>
          ) : (
            <div>
              {this.state.articles.map(article => {
                return (
                  <div className="articles" key={article._id}>
                    <div className="article-stub">
                      <div className="votes">
                        <Vote
                          votes={article.votes}
                          _id={article._id}
                          section={"articles"}
                        />
                      </div>
                      <p className="meta-info">
                        Posted by {article.created_by.username}
                        {" | "}
                        {formatDate(article.created_at)}
                        <span className="topic-cat">
                          <strong>nc/{article.belongs_to}</strong>
                        </span>
                      </p>
                      <Link
                        to={`/articles/${article._id}`}
                        className="article-title"
                      >
                        <strong>{article.title}</strong>
                      </Link>
                      <p className="article-body">
                        {article.body
                          .split(" ")
                          .slice(0, 60)
                          .join(" ")}
                        {article.body.split(" ").length > 60 && (
                          <i className="fas fa-arrow-right" />
                        )}
                      </p>
                      {`${article.comment_count} ${(article.comment_count ===
                        1 &&
                        `Comment`) ||
                        `Comments`}`}
                      <i class="fas fa-comment" />
                    </div>
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
