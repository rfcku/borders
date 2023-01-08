// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBorders, byCountry,  cleanObj, arrangeBy } from '../../utils'

export default async function handler(req, res) {

  const { groupBy, portName } = req.query;

  const data = await getBorders();

  const { ports } = data;

  if (groupBy) {
    const ports_byCountry = byCountry(ports);
    return res.status(200).json({
          query: req.query,
          ports: ports_byCountry
    });
  }

  if (portName) {
    return res.status(200).json({ 
        query: req.query,
        ports: ports.filter((port) => {
            return port.port_name.toLowerCase().includes(portName.toLowerCase());
        }),
    });
}

  return res.status(200).json({  data: ports });
}
