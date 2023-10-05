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
  // for each port in collection check if it exists in the database

  // if it exists then update it

  // if it doesn't exist then insert it

  const validate = await authorize(req, res);

  if (validate === false) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  const data = await getBorders();

  const client = await clientPromise;

  const db = await client.db('borders');
  await data.ports.forEach(async (port) => {
    const { port_number } = port;

    const p = {
      port_number,
      border: port.border,
      port_name: port.port_name,
      crossing_name: port.crossing_name,
      hours: port.hours,
      created_at: new Date(),
    };

    let exists = await db.collection('ports').findOne({ port_number });
    if (exists) {
      await db.collection('ports').updateOne({ port_number }, { $set: p });
    } else {
      exists = await db.collection('ports').insertOne(p);
    }

    await db.collection('lanes').insertOne({
      port_number: port_number,
      passenger_vehicle_lanes: port.passenger_vehicle_lanes,
      pedestrian_lanes: port.pedestrian_lanes,
      commercial_vehicle_lanes: port.commercial_vehicle_lanes,
      port_status: port.port_status,
      timestamp: new Date(),
      port_id: exists._id,
    });
  });

  return res.status(200).json({
    query: req.query,
    ports: data.ports,
    total: data.ports.length,
  });
}
