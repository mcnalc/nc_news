import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import formatDate from "./utils/formatDate";
import Vote from "./Vote";
const BASE_URL = `https://clairencnews.herokuapp.com/api`;

export default class Article extends Component {
  state = {
    article: {},
    loading: true
  };
  render() {
    const { title, body, comment_count, votes, _id } = this.state.article;
    return this.state.loading ? (
      <h2>Loading...</h2>
    ) : (
      <div key={title} className="one-article">
        <div className="article-stub">
          <div classname="votes">
            <Vote className="votes" votes={votes} _id={_id} />
          </div>
          <h1 className="article-title">{title}</h1>
          <div className="meta-info">
            Posted by: {""}
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
            {" | "} {formatDate(this.state.article.created_at)}
          </div>
          <p classname="article-body">{body}</p>
          <Link to={`/articles/${this.props.article_id}/comments`}>
            {comment_count} Comments <i class="fas fa-comment" />
          </Link>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  vote = () => {
    api.vote(this.state.article_id).then(({ votes }) => {
      this.setState(state => {
        return {
          article: { ...state.article, votes: state.article.votes + 1 }
        };
      });
    });
  };

  fetchArticle = () => {
    api.getArticle(this.props.article_id).then(article => {
      this.setState({
        article,
        loading: false
      });
    });
  };
}
