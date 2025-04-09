export default function debounce(callback, delay) {
  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args);
      timer = null; //null serve pra ao invés de limpar direto o timer,agora só vai limpar quando existir alguma coisa no timer do clearTimeout
    }, delay);
  };
}
