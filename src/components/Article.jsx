import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import "./Article.css";
import formatDate from "./utils/formatDate";
const BASE_URL = `https://clairencnews.herokuapp.com/api`;

export default class Article extends Component {
  state = {
    article: {},
    loading: true
  };
  render() {
    const { title, body, comment_count, votes } = this.state.article;
    return this.state.loading ? (
      <h2>Loading...</h2>
    ) : (
      <div key={title} className="one-article">
        <h1>{title}</h1>
        Posted by:
        <Link to={`/users/${this.state.article.created_by.username}`}>
          <strong>
            <span className="profile-info">
              {this.state.article.created_by.username}
              <img
                src={this.state.article.created_by.avatar_url}
                height="20"
                width="20"
              />
            </span>
          </strong>
        </Link>
        on {formatDate(this.state.article.created_at)}
        <p>{body}</p>
        <p>Upvotes: {votes}</p>
        <p>Comments: {comment_count}</p>
        {/* <Link to={`/articles/${this.props.id}/comments`}>
          {comment_count} Comments />
        </Link> */}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle = () => {
    api.getArticle(this.props.article_id).then(article => {
      this.setState({
        article,
        loading: false
      });
    });
  };
}
