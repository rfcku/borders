// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getBorders, byCountry,  cleanObj, arrangeBy} from '../../utils'

export default async function handler(req, res) {

  const { groupBy } = req.query;

  const reports = await getBorders();

  const { port: ports } = reports;

  if (groupBy) {
    if (groupBy == 'country') {
      const ports_byCountry = await byCountry(ports);
      return res.status(200).json({ data: ports_byCountry });
    }
  }

  return res.status(200).json({ 
    data:  ports.map((port) => cleanObj(port))
  });
}
