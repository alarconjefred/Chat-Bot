export const config = {
  port: process.env.PORT || 3000,
  apiKey: process.env.GEMINI_API_KEY || '',
  model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  env: process.env.NODE_ENV || 'development'
};
