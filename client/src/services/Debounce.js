const debounce = (callback, delay) => {
  let timer;
  return function () {
    const fnCall = () => {
      callback.apply(this, arguments);
    }
    clearTimeout(timer);
    timer = setTimeout(fnCall, delay);
  };
};

export default debounce;
