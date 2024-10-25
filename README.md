
---

# MetroWeatherApp

MetroWeatherApp is a real-time weather monitoring system for major metro cities in India, displaying daily temperature data on an interactive visual chart. The app integrates the OpenWeatherMap API to fetch weather data and provides users with options to view temperatures in both Celsius and Fahrenheit.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Build and Run Instructions](#build-and-run-instructions)
- [Design Choices](#design-choices)
- [Dependencies](#dependencies)
- [Contributing](#contributing)

---

## Features

- Fetches real-time weather data for multiple metro cities.
- Displays temperatures for each city in Celsius or Fahrenheit.
- Allows users to toggle between temperature units.
- Interactive line charts using Chart.js to represent daily weather trends.
- Responsive design, optimized for both mobile and desktop users.

---

## Architecture

- **Frontend**: React.js for rendering a responsive and dynamic user interface.
- **Backend**: Node.js/Express server handling API requests.
- **Data Fetching**: OpenWeatherMap API for retrieving live weather data.
- **UI Components**: The main UI component displays weather charts for multiple cities.

---

## Tech Stack

- **Frontend**: React.js, Chart.js for data visualization.
- **Backend**: Node.js, Express.js for handling API requests.
- **API**: OpenWeatherMap API for real-time weather data.
- **Containerization**: Docker (optional, for running the app in a container).

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/MetroWeatherApp.git
cd MetroWeatherApp
```

---

## Build and Run Instructions

### Option 1: Running Locally

1. **Install Dependencies**:
   Navigate to the project directory and install all required dependencies using npm:

   ```bash
   npm install
   ```

2. **Set Up OpenWeatherMap API Key**:
   Create a `.env` file in the root directory with the following content:

   ```bash
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual OpenWeatherMap API key.

3. **Run the Application**:
   Start the development server:

   ```bash
   npm start
   ```

4. **Access the Application**:
   Open your web browser and go to [http://localhost:3000](http://localhost:3000).

---

### Option 2: Running with Docker

1. **Ensure Docker is Installed**:
   Make sure Docker is installed. If not, follow the [Docker installation guide](https://docs.docker.com/get-docker/).

2. **Build the Docker Image**:
   From the root of the repository, build the Docker image:

   ```bash
   docker build -t metro-weather-app .
   ```

3. **Run the Docker Container**:

   ```bash
   docker run -p 3000:3000 metro-weather-app
   ```

4. **Access the Application**:
   Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the running application.

---

## Usage

### Toggle Temperature Units
The app allows users to switch between Celsius and Fahrenheit for temperature data. Use the dropdown provided on the UI to toggle between these two units.

---

## Design Choices

1. **Frontend Framework**: React.js was chosen for its component-based architecture, making it easier to manage the UI and state.
2. **Data Visualization**: Chart.js was selected to render interactive line charts for temperature data.
3. **Temperature Conversion**: The app supports both Celsius and Fahrenheit temperature units, with conversion handled on the frontend.
4. **Responsive Design**: The app is designed to be fully responsive, ensuring a seamless experience on both desktop and mobile devices.
5. **Dockerization**: Docker provides a consistent environment for deployment, ensuring that the app can run on any machine without dependency conflicts.

---

## Dependencies

### Node.js Dependencies
The following dependencies are used in the project and can be installed via `npm`:

- `react` — Library for building user interfaces.
- `chart.js` — Library for rendering interactive charts.
- `react-chartjs-2` — React wrapper for Chart.js.
- `axios` — Promise-based HTTP client for fetching API data.
- `dotenv` — Library for managing environment variables.

To install dependencies, use:

```bash
npm install
```

### Docker Dependencies (Optional)

To run the application in a containerized environment, Docker is required. Install it from the [Docker website](https://www.docker.com/products/docker-desktop).

---

## Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify this `README.md` according to your app’s actual implementation. Make sure to replace `your-username` in the GitHub URL with your actual GitHub handle and add any other features or design choices specific to your project.
