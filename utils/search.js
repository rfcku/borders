import { Client } from "@googlemaps/google-maps-services-js";
const client = new Client({
  key: process.env.GOOGLE_MAPS_API_KEY,
});
export default async function handler(query) {
  const { port_name, border, crossing_name } = query;
  const input = `${border} ${port_name} ${crossing_name}`;
  const response = await client.findPlaceFromText(
    {
      params: {
        input,
        inputtype: "textquery",
        fields: ["name", "formatted_address", "geometry"],
      },
    },
    (err, res) => {
      if (err) {
        return { query, input, data: [], response: err };
      }
      return { query, input, data: res.data.candidates, response: res };
    }
  );
  return { query, input, data: response.data.candidates, response };
}
