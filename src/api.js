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

export const getUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data.users;
};

export const getUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user[0];
};

// export const updateLikeCount = (target_id, direction, type) => {
//   const url =
//     type === "comment"
//       ? `${BASE_URL}/comments/${target_id}?vote=${direction}`
//       : `${BASE_URL}/articles/${target_id}?vote=${direction}`;
//   return axios.patch(url).then(({ data }) => data[type]);
// };

export const login = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data;
};

export const vote = async id => {
  const { data } = await axios.patch(`${BASE_URL}/articles/${id}?vote=up`);
  console.log(data);
};
