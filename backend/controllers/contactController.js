import ContactMessage from '../models/ContactMessage.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const newContactMessage = new ContactMessage({
      name,
      email,
      message,
    });

    await newContactMessage.save();

    res.status(201).json({
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
};
