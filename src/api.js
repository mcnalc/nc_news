import axios from "axios";

const BASE_URL = `https://clairencnews.herokuapp.com/api`;

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

export const getArticles = async topic => {
  const url = topic
    ? `${BASE_URL}/topics/${topic}/articles`
    : `${BASE_URL}/articles`;

  const { data } = await axios.get(url);
  return data.articles;
};

export const getArticle = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data.article;
};

export const postArticle = async (article, slug) => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${slug}/articles`,
    article
  );
  return data.article;
};

export const postComment = async (comment, article_id) => {
  console.log(comment);
  const { data } = await axios.post(
    `${BASE_URL}/articles/${article_id}/comments`,
    comment
  );
  return data.comment;
};

export const getComments = async id => {
  const URL = id
    ? `${BASE_URL}/articles/${id}/comments`
    : `${BASE_URL}/comments`;
  const { data } = await axios.get(URL);
  return data.comments;
};

export const getUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data;
};

export const login = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data;
};

export const vote = async (id, section, direction) => {
  const { data } = await axios.patch(
    `${BASE_URL}/articles/${id}?vote=${direction}`
  );
  console.log(data);
};
