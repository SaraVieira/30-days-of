const isAdmin = () => {
  const key = process.env.REACT_APP_LOCALSTORAGE_KEY;
  const value = process.env.REACT_APP_LOCALSTORAGE_VALUE;

  return value && key && localStorage.getItem(key) === value;
};

export default isAdmin;
