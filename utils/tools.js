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

module.exports =  {
    promisify
}