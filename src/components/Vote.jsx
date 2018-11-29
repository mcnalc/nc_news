import React, { Component } from "react";
import * as api from "../api";

export default class Vote extends Component {
  state = {
    voteChange: 0
  };
  render() {
    return (
      <div>
        <button
          disabled={this.state.voteChange === 1}
          onClick={() => this.vote("up")}
        >
          <i class="fas fa-arrow-up" />
        </button>
        <p>{`${this.props.votes + this.state.voteChange}`}</p>
        <button
          disabled={this.state.voteChange === -1}
          onClick={() => this.vote("down")}
        >
          <i class="fas fa-arrow-down" />
        </button>
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
