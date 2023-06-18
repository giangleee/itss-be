const convertResponse = (status = null, message = null, data, response) => {
    const payload = {message: message, data: data}
    response.status(status ? status : 200).json(payload)
}

module.exports = convertResponse
