/**
 * promise
 * @param nodeFunction
 * @returns {function(...[*]): Promise<any>}
 */
const promisify = function (nodeFunction) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            nodeFunction.call(this, ...args, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    };
};

const getDate = (date) => {
    const dateFormat = date ? new Date(date) : new Date();

    const year = dateFormat.getFullYear();
    const month = dateFormat.getMonth() + 1;
    const day = dateFormat.getDate();

    return `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;
};

module.exports =  {
    promisify,
    getDate
}