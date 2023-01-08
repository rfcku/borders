// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBorders, byCountry,  cleanObj, arrangeBy } from '../../utils'

export default async function handler(req, res) {

  const { portName } = req.query;

  const data = await getBorders();

  const { ports } = data;

  if (!portName) {
    //return error
    return res.status(400).json({
        error: 'Please provide a port name'
    });

}

return res.status(200).json({ 
    query: req.query,
    ports: ports.filter((port) => {
        return port.port_name.toLowerCase().includes(portName.toLowerCase());
    }),
});

}
