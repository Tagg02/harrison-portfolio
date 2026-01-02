const form = document.getElementById("cf-form");
const resetBtn = document.getElementById("reset");
const result = document.getElementById("result");
const totalTons = document.getElementById("totalTons");
const breakdown = document.getElementById("breakdown");
document.getElementById("year").textContent = new Date().getFullYear();

// Simplified demo factors (portfolio-friendly, not a formal audit)
// Units:
// - driving: kg CO2e per mile (average car)
// - electricity: kg CO2e per kWh (rough grid average)
// - flights: kg CO2e per flight (very approximate)
const FACTORS = {
  drivingKgPerMile: 0.30,
  electricityKgPerKwh: 0.20,
  shortFlightKg: 250,
  longFlightKg: 1100,
  dietKgPerYear: {
    mixed: 2000,
    lowmeat: 1600,
    vegetarian: 1200,
    vegan: 900,
  }
};

function num(v){
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const milesWeekly = num(form.miles.value);
  const kwhMonthly = num(form.kwh.value);
  const shortFlights = num(form.shortFlights.value);
  const longFlights = num(form.longFlights.value);
  const diet = form.diet.value || "mixed";

  const drivingKg = milesWeekly * 52 * FACTORS.drivingKgPerMile;
  const electricityKg = kwhMonthly * 12 * FACTORS.electricityKgPerKwh;
  const flightsKg = (shortFlights * FACTORS.shortFlightKg) + (longFlights * FACTORS.longFlightKg);
  const dietKg = FACTORS.dietKgPerYear[diet] ?? FACTORS.dietKgPerYear.mixed;

  const totalKg = drivingKg + electricityKg + flightsKg + dietKg;
  const total = totalKg / 1000; // tons

  totalTons.textContent = total.toFixed(1);
  breakdown.textContent =
    `Driving: ${(drivingKg/1000).toFixed(1)}t • Electricity: ${(electricityKg/1000).toFixed(1)}t • Flights: ${(flightsKg/1000).toFixed(1)}t • Diet: ${(dietKg/1000).toFixed(1)}t`;

  result.hidden = false;
});

resetBtn.addEventListener("click", () => {
  form.reset();
  result.hidden = true;
});
