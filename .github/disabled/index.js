// /**
//  * Get Config
//  * @typedef {object} Config
//  * @property {string[]} columns
//  * @property {boolean} latest
//  * @property {string} heading
//  * @property {boolean} summary
//  * @property {boolean} open
//  * @property {boolean} ncu
//  * @property {boolean} update
//  * @property {string[]} exclude
//  * @property {boolean} fail
//  * @property {boolean} link
//  * @property {string} token
//  * @return {Config}
//  */
// function getConfig() {
//   return {
//     columns: core.getInput('columns', { required: true }).split(','),
//     latest: core.getBooleanInput('latest'),
//     heading: core.getInput('heading'),
//     open: core.getBooleanInput('open'),
//     ncu: core.getBooleanInput('ncu'),
//     update: core.getBooleanInput('update'),
//     link: core.getBooleanInput('link'),
//     exclude: core.getInput('exclude').split(','),
//     fail: core.getBooleanInput('fail'),
//     summary: core.getBooleanInput('summary'),
//     token: core.getInput('token', { required: true }),
//   }
// }
