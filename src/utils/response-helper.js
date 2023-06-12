const convertResponse = (status = null, message = null, data, response) => {
    const payload = {message: message, data: data}
    if (status)
        response.status(status).json(payload)
    response.status(200).json(payload)
}

module.exports = convertResponse
