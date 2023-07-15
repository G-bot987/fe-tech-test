export default async function ChartHome() {
  const response = await fetch("https://api.frankfurter.app/2023-01-01..2023-01-31?from=GBP&to=USD");
  const data = await response.json();

  const rates: Record<string, { USD: number }> = data.rates;

  const dataKeys = Object.keys(rates);

  const chartData = Object.values(rates).map(({ USD }: { USD: number }, index: number) => ({
    y: USD,
    x: new Date(dataKeys[index]),
  }));

  const historicResponse = await fetch("https://api.frankfurter.app/2013-01-01..2013-01-31?from=GBP&to=USD");
  const historicData = await historicResponse.json();

  const historicRates: Record<string, { USD: number }> = historicData.rates;

  const historicChartData = Object.values(historicRates).map(({ USD }: { USD: number }, index: number) => ({
    y: USD,
    x: new Date(dataKeys[index]),
  }));

  return <div></div>;
}
