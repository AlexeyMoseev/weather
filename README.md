# Weather Widget

A customizable, production-ready weather widget built with Vue 3 Composition API, TypeScript, and Vuetify. Designed for easy embedding into any website with modern architecture and team collaboration in mind.

## ✨ Features

- 🌍 **Multi-city support** - Display weather for multiple cities simultaneously
- 📍 **Smart geolocation** - Automatically detects user location on first load
- ⚙️ **Intuitive settings** - Add, remove, and reorder cities with drag & drop
- 💾 **Persistent storage** - Saves preferences to localStorage
- 🎨 **Beautiful UI** - Built with Vuetify Material Design components
- 📱 **Responsive design** - Works seamlessly on all screen sizes
- 🧩 **Web component** - Easy integration as custom HTML element
- 🏗️ **Scalable architecture** - Composables, services, and utils patterns
- 📊 **Comprehensive weather data** - Temperature, humidity, wind, pressure, visibility, dew point

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key ([get one free](https://openweathermap.org/api))

### Installation

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd plumsail
npm install
```

2. **Configure environment variables:**

Create a `.env` file in the project root (you can copy from `.env.example`):

```bash
cp .env.example .env
```

Then add your OpenWeatherMap API key:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

> ⚠️ **Important:** Never commit your `.env` file with real API keys to version control. The `.env` file is already listed in `.gitignore`.

3. **Start development server:**

```bash
npm run dev
```

4. **Build for production:**

```bash
npm run build
```

The compiled widget will be in `dist/weather-widget.js`.

> 💡 **Note:** For production deployment, make sure to set the `OPENWEATHER_API_KEY` environment variable on your hosting platform.

## 📦 Usage

### Embedding in HTML

Simply add the custom element to any HTML page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather Widget Demo</title>
  </head>
  <body>
    <weather-widget></weather-widget>
    <script src="dist/weather-widget.js"></script>
  </body>
</html>
```

The widget is fully self-contained with all styles and dependencies bundled.

### Widget Sizing

**Default width:** The widget has a default and maximum width of **600px**, which is optimized for readability and visual appeal.

**Responsive behavior:**

- On screens smaller than 600px, the widget automatically adapts to fit the screen
- To constrain the widget to a smaller width, wrap it in a container with `max-width`:

```html
<div style="max-width: 400px;">
  <weather-widget></weather-widget>
</div>
```

## 🎯 Key Features Explained

### Weather Display

Each city card shows:

- Current temperature & "feels like"
- Weather description with icon
- Wind speed & cardinal direction
- Atmospheric pressure
- Humidity & dew point
- Visibility distance

### City Management

**Add cities:** Search by name, validates against duplicates

**Remove cities:** One-click delete with immediate effect

**Reorder cities:** Drag and drop to change display order

**Auto-save:** All changes persist to localStorage

### Geolocation Flow

1. First load → checks localStorage
2. No saved cities → requests geolocation
3. Geolocation denied → defaults to London
4. Displays weather for selected/detected city

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # Vue components
│   ├── WeatherWidget.vue   # Main container with state management
│   ├── WeatherCard.vue     # Weather display card
│   └── SettingsView.vue    # City management interface
├── composables/        # Reusable composition functions
│   ├── useWeather.ts      # Weather data loading & initialization
│   ├── useCities.ts       # City search & management logic
│   └── useDragAndDrop.ts  # Generic drag-and-drop functionality
├── services/           # External integrations
│   ├── weather.service.ts  # OpenWeatherMap API client
│   └── storage.service.ts  # LocalStorage abstraction
├── utils/              # Pure utility functions
│   └── formatters.ts      # Weather data formatters
├── types/              # TypeScript definitions
│   └── index.ts
└── main.ts             # Web component registration
```

### Design Patterns

**Composition API** - Leverages Vue 3's composables for reusable logic

**Service Layer** - Separates API and storage concerns from UI logic

**Pure Functions** - Utility functions for formatting are side-effect free

**Type Safety** - Comprehensive TypeScript interfaces throughout

**Single Responsibility** - Each module has a clear, focused purpose

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Production build with minification
npm run type-check   # TypeScript type validation
npm run lint         # ESLint code quality check
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
```

### Tech Stack

| Technology     | Purpose                                    |
| -------------- | ------------------------------------------ |
| **Vue 3**      | Progressive framework with Composition API |
| **TypeScript** | Type-safe JavaScript development           |
| **Vuetify 3**  | Material Design component library          |
| **SCSS**       | Enhanced CSS with variables & nesting      |
| **Webpack 5**  | Module bundling & optimization             |
| **Babel**      | JavaScript transpilation                   |
| **ESLint**     | Code quality & consistency                 |
| **Prettier**   | Code formatting                            |

### API Integration

Uses [OpenWeatherMap Current Weather API](https://openweathermap.org/current):

- Free tier: 60 calls/minute, 1,000,000 calls/month
- No server required - direct client-side calls
- Supports coordinates and city name searches
- API key managed via environment variables for security

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

Requires modern browser with ES6+ and Custom Elements support.

## 🔒 Privacy & Security

- **No tracking** - Zero analytics or user tracking
- **Client-side only** - No data sent to external servers (except OpenWeatherMap)
- **Environment variables** - API keys stored securely in `.env` file (not committed to git)
- **Local storage** - User preferences stored locally only
- **HTTPS recommended** - For geolocation API access

## 🤝 Contributing

This project was built as a technical assessment demonstrating:

- Clean, maintainable code architecture
- Modern Vue.js best practices
- TypeScript proficiency
- Component composition patterns
- Team-oriented code structure
- Production-ready implementation
