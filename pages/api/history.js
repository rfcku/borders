import clientPromise from '../../lib/mongodb';
import authorize from '../../utils/authorize';

/**
 * @swagger
 * /api/history:
 *   get:
 *     description: Returns historical wait time data for a given port number
 *     parameters:
 *       - name: portNumber
 *         in: query
 *         description: Port number
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns historical data
 *       400:
 *         description: Please provide a port number
 *       500:
 *         description: Something went wrong
 */
export default async function handler(req, res) {
  const validate = await authorize(req, res);

  if (validate === false) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  const { portNumber } = req.query;

  if (!portNumber) {
    return res.status(400).json({
      error: 'Please provide a port number',
    });
  }

  try {
    const client = await clientPromise;
    const db = await client.db('borders');
    
    // Get last 24 records for this port
    const history = await db.collection('lanes')
      .find({ port_number: portNumber })
      .sort({ timestamp: -1 })
      .limit(24)
      .toArray();

    return res.status(200).json({
      portNumber,
      history,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Something went wrong',
      details: error.message,
    });
  }
}
