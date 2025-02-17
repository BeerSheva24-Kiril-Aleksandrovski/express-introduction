const accountingPaths = {
    POST: {
        authentication: (req) => req.path.includes("Admin") ? "basic" : "",
        authorization: req => req.path.includes("Admin") ? req.username === process.env.ADMIN_USERNAME : true
    },
    DELETE: {
        authentication: (req) => "basic", 
        authorization: (req) => req.username === process.env.ADMIN_USERNAME || req.username == req.body.email
    },
    PUT: {

        authentication: (req) => "basic", 
        authorization: (req) => req.username === process.env.ADMIN_USERNAME || req.username == req.body.email
    },
    GET: {
        authentication: (req) => "basic", 
        authorization: (req) => req.username === process.env.ADMIN_USERNAME || req.username == req.body.email
    }
}

export default accountingPaths;