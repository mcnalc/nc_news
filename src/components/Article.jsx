import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import Comments from "./Comments";
import formatDate from "./utils/formatDate";
import Vote from "./Vote";
const BASE_URL = `https://clairencnews.herokuapp.com/api`;

export default class Article extends Component {
  state = {
    article: {},
    loading: true
  };
  render() {
    const {
      article,
      title,
      body,
      comment_count,
      votes,
      _id
    } = this.state.article;
    const user = this.props;
    return this.state.loading ? (
      <i className="fa fa-spinner fa-pulse" aria-hidden="true" />
    ) : (
      <div key={title} className="articles">
        <div className="single-article">
          <Vote className="votes" votes={votes} _id={_id} />
          <div className="meta-info">
            Posted by: {""}
            <Link to={`/users/${this.state.article.created_by.username}`}>
              <strong>
                {this.state.article.created_by.username}
                <img
                  src={this.state.article.created_by.avatar_url}
                  onError={e => (e.target.src = "/default.jpeg")}
                  className="tiny-avatar"
                />
              </strong>
            </Link>
            {" | "} {formatDate(this.state.article.created_at)}
          </div>
          <h1 className="article-title">{title}</h1>

          <p classname="article-body">{body}</p>
          <div className="article-comments">
            <Link to={`/articles/${this.props.article_id}/comments`}>
              {comment_count} Comments <i class="fas fa-comment" />
            </Link>
          </div>
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
    api
      .getArticle(this.props.article_id)
      .then(article => {
        this.setState({
          article,
          loading: false
        });
      })
      .catch(err => {
        console.log("am i here?");
        navigate("/error", {
          replace: true,
          state: {
            errCode: err.response.status,
            errMsg: err.response.data.msg
          }
        });
      });
  };
}
