import jwt from 'jsonwebtoken';

// 인증 미들웨어
const auth = async (req, res, next) => {
    try {
        // 1. 헤더에서 토큰 추출
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            // 2. 토큰이 없는 경우, 인증 오류 응답 반환
            return res.status(403).json({ error: "A token is required for authentication" });
        }

        // 3. 토큰 검증
        const decoded = jwt.verify(token, 'arcwiki');

        // 4. 디코딩된 사용자 정보를 요청에 추가
        req.user = decoded;

        next();
    } catch (error) {
        // 5. 토큰이 유효하지 않은 경우, 인증 오류 응답 반환
        return res.status(401).json({ error: "Invalid Token" });
    }
};

export default auth;