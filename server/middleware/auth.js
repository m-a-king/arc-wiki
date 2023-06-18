import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(403).json({ message: "A token is required for authentication" });
        }

        const decoded = jwt.verify(token, 'arcwiki');

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

export default auth;