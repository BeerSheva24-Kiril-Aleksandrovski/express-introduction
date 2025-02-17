const coursesPaths = {
    POST: {
        authentication: 'jwt',
        authorization: req => req.role === "ADMIN"
    },
    PUT: {
        authentication: 'jwt',
        authorization: req => req.role === "ADMIN"
    },
    GET: {
        authentication: 'jwt',
        authorization: req => true
    },
    DELETE: {
        authentication: 'jwt',
        authorization: req => req.role === "ADMIN"
    }
}
export default coursesPaths;