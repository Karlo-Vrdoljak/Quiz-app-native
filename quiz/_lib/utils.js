export function fetcher(url, options = null) {
  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));
}
