import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const { id, password, name, nickname, email } = req.body;

    const existingUser = await User.findOne({
        where: {
            user_id: id
        }
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      user_id: id,
      user_password: hashedPassword,
      user_nickname: nickname,
      user_name: name,
      user_email: email,
    });

    res.status(201).json({ user: result.user_id });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.log(error);
  }
};

export const signIn = async (req, res) => {
    try {
      const { id, password } = req.body;
  
      const existingUser = await User.findOne({
        where: {
          user_id: id
        }
      });
  
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.user_password);
  
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
  
      const token = jwt.sign(
        { id: existingUser.user_id, name: existingUser.user_name },
        'arcwiki',
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
      console.log(error);
    }
  };