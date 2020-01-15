/**
 * Class Response
 */

/**
 *
 * @param {string} status response text
 * @param {number} code  response code
 * @param {string} message response description
 * @param {object} data  response data object
 */
const Response = (status, code, message, data) => {
    return { status, code, message, ...data}
}

export default Response;
