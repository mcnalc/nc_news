import React, { Component } from "react";
import * as api from "../api";

export default class Vote extends Component {
  state = {
    voteChange: 0
  };
  render() {
    return (
      <div>
        <div className="upvote">
          <button
            disabled={this.state.voteChange === 1}
            onClick={() => this.vote("up")}
          >
            <i class="fas fa-arrow-up" />
          </button>
        </div>

        <p>{`${this.props.votes + this.state.voteChange}`}</p>
        <div className="downvote">
          <button
            disabled={this.state.voteChange === -1}
            onClick={() => this.vote("down")}
          >
            <i class="fas fa-arrow-down" />
          </button>
        </div>
      </div>
    );
  }

  vote = direction => {
    api.vote(this.props._id, this.props.section, direction).catch(() => {
      this.cancelVote();
    });
    direction === "up"
      ? this.setState({
          voteChange: this.state.voteChange + 1
        })
      : this.setState({
          voteChange: this.state.voteChange - 1
        });
  };

  cancelVote = () => {
    this.setState({
      voteChange: 0
    });
  };
}
