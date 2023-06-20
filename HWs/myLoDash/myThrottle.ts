interface opt {
    leading: boolean;
    trailing: boolean;
}

function myThrottle(func: Function, wait: number, options: opt) : Function {
  let timeout: ReturnType<typeof setTimeout>;
  let lastCalledTime = 0;

  return function (...args: any[]) {
    const currentTime = Date.now();
    const timeSinceLastCall = currentTime - lastCalledTime;

    if (!timeout || timeSinceLastCall >= wait) {
      func.apply(null, args);
      lastCalledTime = currentTime;
    } else {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        func.apply(null, args);
        lastCalledTime = currentTime;
      }, wait - timeSinceLastCall);
    }
  };
}

export default myThrottle;