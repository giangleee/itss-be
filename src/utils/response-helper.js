const convertResponse = (status = null, data, response) => {
    if (status)
        response.status(status).json(data)
    response.status(200).json(data)
}

module.exports = convertResponse
