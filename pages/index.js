import { useState } from "react";
import {
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Text,
  Collapse,
} from "@nextui-org/react";
import Head from "next/head";
import Autocomplete from "../components/autocomplete";
import Border from "../components/border";
import { cleanObj, getBorders, arrangeBy } from "../utils";

const groups = {
  Canada: [],
  Mexico: [],
};

export default function Home({ time, groups }) {
  const [country, setCountry] = useState("Mexico");
  const ports = groups[country];
  const countries = Object.keys(groups);

  const [portName, setPortName] = useState("");

  const gs = arrangeBy(ports, "port_name");

  const keys = Object.keys(gs);
  const autocompleteKeys = keys.map((title) => ({label: title}))
  const handleAutoComplete = (title) => {
    setPortName(title)
  }
  return (
    <>
      <Head>
        <title>Border Wait Times US / {country.toUpperCase()}</title>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
      </Head>
      <Container>
        <Grid.Container gap={2}>
          <Grid>
          <Collapse
            expanded={ portName !== "" ? false : true}
            title={<Text h4 weight="bold">Us / {country}</Text>}
            subtitle={
              <div>
                <Autocomplete 
                  options={autocompleteKeys}
                  onSelect={handleAutoComplete}
                />
              </div>
            }
          >
            {Object.keys(gs).map((title) => (
              <Badge
                key={title}
                color={portName === title ? "success" : "default"}
                onClick={() => setPortName(title)}
              >
                {title}
              </Badge>
            ))}
          </Collapse>
          </Grid>
          <Grid.Container gap={2}>
            {ports.map((port) => {
              if (portName !== "" && port.port_name !== portName) return null;

              return (
                <Grid xs={12} sm={6} md={3} key={port.port_number}>                  
                  <Border {...port} />
                </Grid>
              );
            })}
          </Grid.Container>
        </Grid.Container>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const reports = await getBorders();
  const { port: ports } = reports;

  const gs = arrangeBy(ports, "port_name");

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
      gs: gs || {},
      keys: Object.keys(gs) || [],
    },
  };
}
