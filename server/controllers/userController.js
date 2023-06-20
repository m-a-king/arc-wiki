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
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const signIn = async (req, res) => {
  try {
    const { id, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        id: id
      }
    });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

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

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  
export const findId = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findOne({
      where: {
        name: name,
        email: email
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const findPw = async (req, res) => {
  try {
    const { id, name, email } = req.body;

    const user = await User.findOne({
      where: {
        id: id,
        name: name,
        email: email
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User found. Password reset allowed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePw = async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await User.findOne({
      where: {
        id: id
      }
    });
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

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
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    
    const user = await User.findOne({
      where: {
        id: id
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userInfo = {
      id: user.id,
      password: '',
      passwordCheck: '',
      name: user.name,
      nickname: user.nickname,
      email: user.email,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { password, name, nickname, email } = req.body;

    const user = await User.findOne({
      where: {
        id: id
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

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

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};