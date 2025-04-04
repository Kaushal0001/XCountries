import React, { useEffect, useState } from "react";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "20px",
      }}
    >
      {countries.map((country) => (
        <div
          key={country.name}
          style={{
            textAlign: "center",
            padding: "10px",
            border: "1px solid black",
            borderRadius: "8px",
          }}
        >
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            style={{ width: "100px", height: "60px" }}
          />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
