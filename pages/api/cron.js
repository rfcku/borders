// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBorders } from '../../utils';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const data = await getBorders();
  const client = await clientPromise;

  // build query for mongodb using last_updated_date, last_updated_time

  const { last_updated_date, last_updated_time } = data;

  // create date object from last_updated_date, last_updated_time
  const date = new Date(`${last_updated_date} ${last_updated_time}`);

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
    msg: 'Done!',
  });
}
