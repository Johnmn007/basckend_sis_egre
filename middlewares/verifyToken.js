const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = bearer.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "secretoSuperSeguro");
        req.user = decoded; // opcionalmente puedes usarlo luego
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token inválido" });
    }
};

module.exports = {verifyToken};