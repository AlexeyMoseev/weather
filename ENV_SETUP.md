# Environment Variables Setup

This project uses environment variables to securely manage API keys.

## Quick Start

1. **Copy the example file:**

   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and add your API key:**

   ```env
   OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

3. **Get your API key:**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Generate a free API key
   - Copy it to your `.env` file

## Important Notes

- ✅ The `.env` file is already in `.gitignore` - it won't be committed
- ✅ Never commit API keys to version control
- ✅ For production, set environment variables on your hosting platform
- ✅ The `.env.example` file shows the required variables without sensitive data

## Supported Variables

| Variable              | Description                 | Required |
| --------------------- | --------------------------- | -------- |
| `OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes      |

## Troubleshooting

**"API key is missing" error?**

- Make sure your `.env` file exists in the project root
- Check that `OPENWEATHER_API_KEY` is set correctly
- Restart the dev server after changing `.env`

**Widget not loading weather data?**

- Verify your API key is active on OpenWeatherMap
- Check browser console for API errors
- Ensure you're not exceeding API rate limits (60 calls/min on free tier)
