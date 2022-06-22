function successResponder(response, payload, description=''){
    return response.status(200).json({
        error: false,
        description,
        payload
    })
}

function errorResponder(response, statusCode, description){
    return response.status(statusCode).json({
        error: true,
        description,
        payload: null
    })
}

module.exports = {
    successResponder, errorResponder
}