const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const chat = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Build messages array with conversation history (limit to last 5 messages)
    const limitedHistory = conversationHistory.slice(-5);

    const messages = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant for UpDive file upload system. Be concise and helpful. Respond in the same language as the user.'
      },
      ...limitedHistory,
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenAI API with optimized settings
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125', // Cheaper model
      messages: messages,
      temperature: 0.5, // Lower temperature for more focused responses
      max_tokens: 250 // Reduced max tokens for shorter responses
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      success: true,
      response: aiResponse,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get AI response',
      error: error.message
    });
  }
};

module.exports = {
  chat
};
