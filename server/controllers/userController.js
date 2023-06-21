import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const { id, password, name, nickname, email } = req.body;

    const existingUser = await User.findOne({
        where: {
          id: id
        }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      id: id,
      password: hashedPassword,
      nickname: nickname,
      name: name,
      email: email,
    });

    res.status(201).json({ user: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const signIn = async (req, res) => {
  try {
    const { id, password } = req.body;

    // 1. 사용자 확인
    const existingUser = await User.findOne({
      where: {
        id: id
      }
    });
    if (!existingUser) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 2. 비밀번호 일치 확인
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: '사용자 정보가 일치하지 않습니다.' });
    }

    // 3. 토큰 생성
    const token = jwt.sign(
      {
        idx: existingUser.idx,
        id: existingUser.id,
      },
      'arcwiki',
      {
        expiresIn: '1h'
      }
    );

    // 4. 성공적인 응답 반환
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error(error);
    // 5. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};
  
export const findId = async (req, res) => {
  try {
    const { name, email } = req.body;

    // 1. 이름과 이메일로 사용자 검색
    const user = await User.findOne({
      where: {
        name: name,
        email: email
      }
    });
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 2. 아이디 응답 반환
    res.status(200).json({ id: user.id });
  } catch (error) {
    console.error(error);
    // 3. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const findPw = async (req, res) => {
  try {
    const { id, name, email } = req.body;

    // 1. 아이디, 이름, 이메일로 사용자 검색
    const user = await User.findOne({
      where: {
        id: id,
        name: name,
        email: email
      }
    });
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 2. 비밀번호 재설정 메시지 응답
    res.status(200).json({ message: '비밀번호를 재설정합니다.' });
  } catch (error) {
    console.error(error);
    // 3. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const updatePw = async (req, res) => {
  try {
    const { id, password } = req.body;

    // 1. 아이디로 사용자 검색
    const user = await User.findOne({
      where: {
        id: id
      }
    });
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 2. 비밀번호 해싱하여 업데이트
    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedUser = await User.update({
      password: hashedPassword,
      updateDate: new Date(),
    }, {
      where: {
        id: id
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    
    // 1. 사용자 정보 조회
    const user = await User.findOne({
      where: {
        id: id
      }
    });
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 2. 사용자 정보 필터링
    const userInfo = {
      id: user.id,
      password: '',
      passwordCheck: '',
      name: user.name,
      nickname: user.nickname,
      email: user.email,
    };

    // 3. 사용자 정보를 응답
    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    // 4. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { password, name, nickname, email } = req.body;

    // 1. 사용자 정보 조회
    const user = await User.findOne({
      where: {
        id: id
      }
    });
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 2. 비밀번호 해시화 및 사용자 정보 업데이트
    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedUser = await User.update({
      password: hashedPassword,
      name: name,
      nickname: nickname,
      email: email,
      updateDate: new Date(),
    }, {
      where: {
        id: id
      }
    });

    // 3. 업데이트된 사용자 정보를 응답
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};