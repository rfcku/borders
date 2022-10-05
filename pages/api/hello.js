// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import xml2js from "xml2js";
const CBP = "https://bwt.cbp.gov/xml/bwt.xml";

export default async function handler(req, res) {
  const reports = await fetch(CBP)
    .then((response) => response.text())
    .then(async (xml) => {
      const json = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
      return json.border_wait_time;
    })
    .catch(console.error);
  console.log("js", reports.port);

  return res.status(200).json({ name: "John Doe" });
}
