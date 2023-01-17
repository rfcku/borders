export default lane = {
    operational_status: {
        type: "string",
        description: "Operational status",
        example: "Open",
        required: true
    },
    update_time: {
        type: "string",
        description: "Update time",
        example: "2021-03-01T00:00:00.000Z",
        required: true
    },
    delay_minutes: {
        type: "string",
        description: "Delay minutes",
        example: "0",
        required: true
    },
    lanes_open: {
        type: "string",
        description: "Lanes open",
        example: "1",
        required: true
    }
}