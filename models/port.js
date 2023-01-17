import lane from './lane';
export default port = {
    port_number: {
        type: "string",
        description: "Port number",
        example: "1",
        required: true
    },
    border: {
        type: "string",
        description: "Border",
        example: "Mexican Border",
        required: true
    },
    port_name: {
        type: "string",
        description: "Port name",
        example: "Andrade",
        required: true
    },
    crossing_name: {
        type: "string",
        description: "Crossing name",
        example: "",
        required: true
    },
    hours: {
        type: "string",
        description: "Hours",
        example: "6 am-10 pm",
        required: true
    },
    date: {
        type: "string",
        description: "Date",
        example: "1/8/2023",
        required: true
    },
    port_status: {
        type: "string",
        description: "Port status",
        example: "Closed",
        required: true
    },
    commercial_automation_type: {
        type: "string",
        description: "Commercial automation type",
        example: "Manual",
        required: true
    },
    passenger_automation_type: {
        type: "string",
        description: "Passenger automation type",
        example: "Manual",
        required: true
    },
    pedestrain_automation_type: {
        type: "string",
        description: "Pedestrain automation type",
        example: "Manual",
        required: true
    },
    commercial_vehicle_lanes: {
        type: "object",
        description: "Commercial vehicle lanes",
        example: {
            "maximum_lanes": "1",
            ...lane
        },
        required: true
    },
    passenger_vehicle_lanes: {
        type: "object",
        description: "Passenger vehicle lanes",
        example: {
            "maximum_lanes": "3",
            ...lane
        },
        required: true
    },
    pedestrain_lanes: {
        type: "object",
        description: "Pedestrain lanes",
        example: {
            "maximum_lanes": "1",
            ...lane
        },
        required: true
    }
  }
  