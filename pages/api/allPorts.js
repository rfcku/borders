// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getBorders, cleanObj, arrangeBy} from '../../utils'
export default async function handler(req, res) {
  // const groups = {
  //   Canada: [],
  //   Mexico: [],
  // };

  const reports = await getBorders();
  const { port: ports } = reports;

  // const gs = arrangeBy(ports, "port_name");

  // ports.forEach((port) => {
  //   const obj = cleanObj(port);
  //   if (port.border[0].includes("Canadian")) {
  //     groups.Canada.push(obj);
  //   } else {
  //     groups.Mexico.push(obj);
  //   }
  // });

  // console.log("Hello from API", gs);
  return res.status(200).json({ data: ports });
}
