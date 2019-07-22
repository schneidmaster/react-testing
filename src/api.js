const API_HOST = "http://localhost:3001";

export const getJSON = (path) => {
  return fetch(`${API_HOST}${path}`).then((response) => response.json());
};

export const postJSON = (path, payload) => {
  return fetch(`${API_HOST}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then((response) => response.json());
};

export const patchJSON = (path, payload) => {
  return fetch(`${API_HOST}${path}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then((response) => response.json());
};
