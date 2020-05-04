import axios from 'axios';

export interface CovidFacts {
  totalCases: number;
  recovered: string;
  deaths: string;
  activeCases: string;
  closedCases: number;
  lastUpdate: string;
}

export const covidFactsApi = 'https://covid-simple.satyawikananda.tech/api/world'

/**
 * Gets the total number of COVID Cases
 * @returns {CovidFacts} Data on COVID
 */
async function getCovidData(): Promise<CovidFacts> {
  const res = await axios.get(covidFactsApi)
  return res.data as CovidFacts;
}

export default getCovidData;
