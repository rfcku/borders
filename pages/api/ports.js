// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBorders, byCountry, cleanObj, arrangeBy } from '../../utils';
import clientPromise from '../../lib/mongodb';

/**
 * @swagger
 * /api/ports:
 *   get:
 *     description: Returns all data for all ports
 *     parameters:
 *      - name: country
 *        in: query
 *        description: Country
 *        required: false
 *        type: string
 *      - name: portName
 *        in: query
 *        description: Port name
 *        required: false
 *        type: string
 *
 *     responses:
 *       200:
 *         description: Returns all ports grouped by country
 *       404:
 *          description: Port not found
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Something went wrong
 */

import authorize from '../../utils/authorize';
export default async function handler(req, res) {
  const client = await clientPromise;

  const db = await client.db('borders').collection('ports');

  const collection = await db.find({}).toArray();

  console.log('collection', collection);

  // for each port in collection check if it exists in the database

  // if it exists then update it

  // if it doesn't exist then insert it

  const validate = await authorize(req, res);

  if (validate === false) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  const { country, portName } = req.query;

  const data = await getBorders();
  // console.log('data', data);
  if (country) {
    const ports_byCountry = byCountry(data.ports);
    const countries = Object.keys(ports_byCountry);

    if (!countries.includes(country)) {
      return res.status(404).json({
        error: 'Country not found',
      });
    }

    if (portName) {
      const port = ports_byCountry[country].filter((port) => {
        return port.port_name.toLowerCase().includes(portName.toLowerCase());
      });
      if (!port.length) {
        //return error
        return res.status(404).json({
          error: 'Port not found',
        });
      }
      return res.status(200).json({
        query: req.query,
        ports: port,
        total: port.length,
      });
    }

    return res.status(200).json({
      query: req.query,
      ports: ports_byCountry[country],
      total: ports_byCountry[country].length,
    });
  }

  return res.status(200).json({
    query: req.query,
    ports: data.ports,
    total: data.ports.length,
  });
}
