import { NextApiRequest, NextApiResponse } from 'next';
import cities from '../../cities.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');

  let resultsLeft = 5;

  const results = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const city of cities) {
    if (city.toLowerCase().includes((req.query.q as string).toLowerCase())) {
      results.push(city);
      resultsLeft -= 1;
      if (resultsLeft === 0) break;
    }
  }
  return res.status(200).json(results);
}
