/* eslint-disable no-unused-vars */
// let x;
// let y;
// let f = n => n * 100 + 100;

let active;

let watch = function (cb) {
  active = cb;
  active();
  active = null;
};

let queue = [];
let nextTick = (cb) => Promise.resolve().then(cb);
let queueJob = (job) => {
  if (!queue.includes(job)) {
    queue.push(job);
    nextTick(flushJobs);
  }
};
let flushJobs = () => {
  let job;
  while ((job = queue.shift()) !== undefined) {
    job();
  }
};

class Dep {
  constructor() {
    this.deps = new Set();
  }
  depend() {
    if (active) {
      this.deps.add(active);
    }
  }
  notify() {
    this.deps.forEach((dep) => queueJob(dep));
  }
}

let ref = (initValue) => {
  let value = initValue;
  let dep = new Dep();

  return Object.defineProperty({}, "value", {
    get() {
      dep.depend();
      return value;
    },
    set(newValue) {
      value = newValue;
      dep.notify();
    },
  });
};

let createReactive = (target, prop, value) => {
  let dep = new Dep();

  return Object.defineProperty(target, prop, {
    get() {
      dep.depend();
      return value;
    },
    set(newValue) {
      value = newValue;
      dep.notify();
    },
  });
};

let reacitve = (obj) => {
  let dep = new Dep();

  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    createReactive(obj, key, value);
  });

  return obj;
};

// let data = reacitve({
//   count: 0
// });
