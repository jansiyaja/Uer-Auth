import jwt from 'jsonwebtoken';

const generateToken = (res, userId ,tokenName) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { 
      expiresIn: '30d',
    });

    console.log('Generated token:', token);

    res.cookie(tokenName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log('Cookie set successfully');
  } catch (error) {
    console.error('Error generating token:', error.message);
  }
};

export default generateToken;