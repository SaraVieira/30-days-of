export const post = (url, data) =>
  fetch(`${process.env.REACT_APP_API}${url}`, {
    headers: {
      "content-type": "application/json",
    },
    method: "put",
    body: JSON.stringify(data),
  }).then((rsp) => rsp.json());

export const getAll = () =>
  fetch(process.env.REACT_APP_API).then((d) => d.json());

export const getOrderedData = async (name) => {
  const rsp = await getAll();
  const pageData = rsp.find((a) => a.name === name);
  const ordered = {
    ...pageData,
    items: pageData.items.sort((a, b) => new Date(a.date) - new Date(b.date)),
  };

  return { rsp, ordered };
};
