export default function Debounce(cb, delay) {
  let timer;
  return function () {
    let context = this;
    clearTimeout(timer);
    setTimeout(() => {
      cb.apply(context, arguments);
    }, delay);
  };
}
