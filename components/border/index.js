import { Grid, Badge, Card, Text } from "@nextui-org/react";

import { Lanes } from "./lane";
import { AiFillCar } from "react-icons/ai";
import { FaWalking } from "react-icons/fa";
export default function Component(data) {

  const {
    port_number,
    port_name,
    crossing_name,
    hours,
    port_status,
    passenger_vehicle_lanes,
    pedestrian_lanes,
  } = data;

  const lanes = [
    {
      title: "Vehicles",
      lane: passenger_vehicle_lanes,
      icon: <AiFillCar />,
    },
    {
      title: "Pedestrian",
      lane: pedestrian_lanes,
      icon: <FaWalking />,
    },
  ];
  return (
    <Card key={port_number}>
      <Card.Header>
        <Text small weight={"bold"}>
          {port_name}
          <Text h3 weight={"black"}>
            {crossing_name && crossing_name !== "" && `${crossing_name}`}
          </Text>
          <Badge
            color={port_status.toLowerCase() === "open" ? "success" : "error"}
          >
            Status: {port_status}
          </Badge>
          <Badge>Hours: {hours}</Badge>
        </Text>
      </Card.Header>
      <Card.Body>
        <Grid.Container direction="row">
          <Lanes lanes={lanes} type="ready_lanes" />
        </Grid.Container>
      </Card.Body>
    </Card>
  );
}
