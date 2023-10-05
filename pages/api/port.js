// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBorders } from '../../utils';
/**
 * @swagger
 * /api/port:
 *   get:
 *     description: Returns port data for a given port name
 *     parameters:
 *       - name: portName
 *         in: query
 *         description: Port name
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns port data for a given port name
 *       404:
 *          description: Port not found
 *       400:
 *         description: Please provide a port name
 *       500:
 *         description: Something went wrong
 */

import authorize from '../../utils/authorize';
export default async function handler(req, res) {
  const validate = await authorize(req, res);

  if (validate === false) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  const { portName } = req.query;

  const data = await getBorders();
  const { ports } = data;
  console.log('ports', ports);

  if (!portName) {
    //return error
    return res.status(400).json({
      error: 'Please provide a port name',
    });
  }
  const p = ports.filter((port) => {
    return port.port_name.toLowerCase().includes(portName.toLowerCase());
  });

  if (!p.length) {
    //return error
    return res.status(404).json({
      error: 'Port not found',
    });
  }

  try {
    //return port data
    return res.status(200).json({
      query: req.query,
      ports: p,
      total: p.length,
    });
  } catch (error) {
    //return error
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
}
