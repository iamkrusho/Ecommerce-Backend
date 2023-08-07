import jwt from "jsonwebtoken";

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({status: "error", error: "Unauthorized"});

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, credentials) => {
        if (err) return res.status(403).send({status: "error", error: "Authentication error"});

        req.user = credentials.user;
        
        next();
    });
}

export default auth;
