import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthService {
  static async register(userData) {
    try {
      const existingUser = await User.findOne({ username: userData.username });
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const user = new User(userData);
      await user.save();
      
      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  static async login(username, password) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }
}

export default AuthService; 