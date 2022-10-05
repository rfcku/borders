import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Card,
  Text,
  Divider,
} from "@nextui-org/react";
import xml2js from "xml2js";
import Border from "../components/border";
import { cleanObj, getBorders } from "../utils";

const groups = {
  Canada: [],
  Mexico: [],
};

export default function Home({ time, groups }) {
  const [country, setCountry] = useState("Mexico");
  const ports = groups[country];
  const countries = Object.keys(groups);
  return (
    <Container>
      <Grid.Container gap={2}>
        <Grid xs={12} align="center" direction="column" justify="center">
          <Text h1>{country.toUpperCase()}</Text>
          <Button.Group>
            {countries.map((key) => (
              <Button
                key={key}
                onClick={() => setCountry(key)}
                disabled={key === country}
              >
                {key.toUpperCase()}
              </Button>
            ))}
          </Button.Group>
        </Grid>
        {ports.map((port) => (
          <Grid xs={3} key={port.port_number}>
            <Border {...port} />
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const reports = await getBorders();
  const { port: ports } = reports;

  ports.forEach((port) => {
    const obj = cleanObj(port);
    if (port.border[0].includes("Canadian")) {
      groups.Canada.push(obj);
    } else {
      groups.Mexico.push(obj);
    }
  });

  return {
    props: {
      ports: ports || [],
      groups: groups || [],
    },
  };
}
