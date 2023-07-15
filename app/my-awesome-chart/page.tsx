

export default async function ChartHome() {
  const response = await fetch("https://api.frankfurter.app/2023-01-01..2023-01-31?from=GBP&to=USD");
  const data = await response.json();

  const historicResponse = await fetch("https://api.frankfurter.app/2013-01-01..2013-01-31?from=GBP&to=USD");
  const historicData = await historicResponse.json();

  return <div></div>;
}
