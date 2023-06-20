interface opt {
    leading: boolean;
    trailing: boolean;
}

function myDebounce(func: Function, wait: number, options: opt) : Function {
    let leading = ((options.leading === undefined) || !options.leading) ? false : true;
    //let trailing = ((options.trailing === undefined) || options.trailing) ? true : false;
    let timerId: ReturnType<typeof setTimeout>;

    return function (...args: any[]) {
        if (leading && !timerId) func.apply(null, args);

        clearTimeout(timerId);

        timerId = setTimeout(() => {
            if (!leading) func.apply(null, args);
        }, wait);
    };
}

export default myDebounce;