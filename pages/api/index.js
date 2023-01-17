// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Console } from "console";
import { getBorders, byCountry } from "../../utils";
import { validQuery } from "../../utils/countries";
import authorize from "../../utils/authorize";
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
export default async function handler(req, res) {
  const validate = await authorize(req, res);

  if (validate === false) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const { portName, country } = req.query;
  const validCountry = validQuery(country);

  if (validCountry === false) {
    return res.status(400).json({
      error: "Please provide a valid country",
    });
  }

  const data = await getBorders();
  const { ports } = data;
  let response = ports;
  if (country) {
    //filter ports by country
    response = byCountry(response)[validCountry];
  }

  if (portName) {
    //filter ports by port name
    response = response.filter((port) => {
      return port.port_name.toLowerCase().includes(portName.toLowerCase());
    });
  }

  try {
    //return port data
    return res.status(200).json({
      query: req.query,
      ports: response,
      total: response.length,
    });
  } catch (error) {
    //return error
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}
