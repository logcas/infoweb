import axios from 'axios';

export function fetchNews(type, page) {
  return axios.get('http://localhost:4001/api/news', {
    params: {
      page,
      type
    }
  });
}