export const getSettings = () =>
  fetch(`http://localhost:3001/api/settings`).then((resp) => resp.json());
