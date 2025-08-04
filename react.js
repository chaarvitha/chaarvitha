import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = 'YOUR_API_KEY'; // Replace with your API key
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">Weather App</h1>
          <Input 
            placeholder="Enter city name" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
          />
          <Button onClick={fetchWeather} disabled={loading || !city}>
            {loading ? 'Fetching...' : 'Get Weather'}
          </Button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {weather && (
            <div className="text-center">
              <h2 className="text-xl font-semibold">{weather.name}, {weather.sys.country}</h2>
              <p className="text-lg">{weather.weather[0].description}</p>
              <p className="text-4xl font-bold">{weather.main.temp}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
