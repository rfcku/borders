import port from './port';
export default country = {
    country_name: {
        type: "string",
        description: "Country name",
        example: "Mexico",
        required: true
    },
    ports: {
        type: "array",
        description: "Ports",
        example: [port],
        required: true
    }
}