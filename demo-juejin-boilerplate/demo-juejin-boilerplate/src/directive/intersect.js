// const intersect = {
//   inserted(el, binding) {
//     const value = binding.value
//     const { handler, options = {} } = value;

//     let observer = new IntersectionObserver((entries = [], options) => {
//       if (!el._observer) return
//       if (handler && el._observer.init) {
//         const isIntersecting = Boolean(
//           entries.find((entry) => entry.isIntersecting)
//         )
//         if (isIntersecting) {
//           handler()
//         }
//       }
//       el._observer.init = true
//     })
//     el._observer = { init: false, observer }
//     observer.observe(el);
//   },
//   unbind(el) {
//     if (!el._observe) return;
//     //停止观察
//     el._observe.observer.unobserve(el);
//     delete el._observe;
//   }
// }
const intersect = {
  inserted(el, binding) {
    const value = binding.value;
    const { handler, options = {} } = value;
    //var io = new IntersectionObserver(callback, option);
    const observer = new IntersectionObserver((entries = [], observer) => {
      if (!el._observe) return;
      if (handler && el._observe.init) {
        const isIntersecting = Boolean(
          entries.find((entry) => entry.isIntersecting) //entry.isIntersecting判断是否出现在视窗之中
        );
        if (isIntersecting) {
          handler(entries, observer, isIntersecting);
        }
      }

      el._observe.init = true;
    }, options);
    el._observe = { init: false, observer };
    //开始观察
    observer.observe(el);
  },
  unbind(el) {
    if (!el._observe) return;
    //停止观察
    el._observe.observer.unobserve(el);
    delete el._observe;
  },
};

export default intersect;
