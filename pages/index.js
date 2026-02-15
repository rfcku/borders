import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Border from "../components/border";
import { Navbar } from "../components/Navbar";
import { timeAgo } from "../utils";
import { getBorders } from "../utils";
import calculateDistance from "../utils/distance";
import { motion, AnimatePresence } from "framer-motion";

export default function Home({ date, time, timeAgo, ports }) {
  const [filtered, setFiltered] = useState(ports || []);
  const [sortByDistance, setSortByDistance] = useState(false);

  const [tags, setTags] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState({
    lat: 0,
    lon: 0,
    msg: "",
  });

  const sortedPorts = useMemo(() => {
    let result = [...filtered];
    if (sortByDistance && userCoordinates.lat && userCoordinates.lon) {
      result.sort((a, b) => {
        if (!a.lat || !a.lon) return 1;
        if (!b.lat || !b.lon) return -1;
        const distA = calculateDistance(userCoordinates.lat, userCoordinates.lon, a.lat, a.lon);
        const distB = calculateDistance(userCoordinates.lat, userCoordinates.lon, b.lat, b.lon);
        return distA - distB;
      });
    }
    return result;
  }, [filtered, sortByDistance, userCoordinates]);

  const handleInput = (e) => {
    setTags(e);
    if (e.length === 0) {
      setFiltered(ports);
      return;
    }
    const found = ports.filter((port) => {
      const name = port.port_name.toLowerCase();
      const crossing = port.crossing_name.toLowerCase();
      const number = port.port_number.toLowerCase();
      const border = port.border.toLowerCase();
      
      return e.some(tag => {
        const lowerTag = tag.toLowerCase();
        return (
          name.includes(lowerTag) ||
          crossing.includes(lowerTag) ||
          number.includes(lowerTag) ||
          border.includes(lowerTag) ||
          port.port_status.toLowerCase().includes(lowerTag)
        );
      });
    });
    setFiltered(found);
  };

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setUserCoordinates({
      lat: crd.latitude,
      lon: crd.longitude,
      msg: `More or less ${crd.accuracy} meters.`,
    });
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <main>
      <Head>
        <title>BorderFlow | Real-time Border Wait Times</title>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
      </Head>
      <Navbar
        date={date}
        time={time}
        timeago={timeAgo}
        tags={tags}
        handleInput={handleInput}
      />
      <div className="flex flex-col gap-4 px-6 md:px-20 pt-6 bg-zinc-950 min-h-screen max-w-[1600px] mx-auto">
        <div className="flex flex-row justify-between items-center mb-4 flex-wrap gap-4">
          <div className="flex flex-row gap-2">
            {["Mexico", "Canada", "Open"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleInput([...tags, filter.toLowerCase()])}
                className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-bold hover:bg-zinc-700 transition-colors"
              >
                + {filter}
              </button>
            ))}
            {tags.length > 0 && (
              <button
                onClick={() => handleInput([])}
                className="px-3 py-1 rounded-full bg-red-900/30 text-red-400 text-xs font-bold hover:bg-red-900/50 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
          <button
            onClick={() => setSortByDistance(!sortByDistance)}
            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase transition-colors ${
              sortByDistance ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {sortByDistance ? "Sorted by Distance" : "Sort by Distance"}
          </button>
        </div>
        <div className="grid xs:grid-cols-1 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {sortedPorts.map((port) => (
              <motion.div
                key={port.port_name + port.port_number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <Border
                  {...port}
                  userCoordinates={userCoordinates}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex text-zinc-500 justify-center align-middle items-enter p-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          className="bi bi-github"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const data = await getBorders();
  const { ports, last_updated_date, last_updated_time, updated } = data;
  const timestamp = new Date(`${last_updated_date} ${last_updated_time}`);
  timestamp.setHours(timestamp.getHours() - 3);
  return {
    props: {
      // groups: grouped || [],
      ports: ports || [],
      date: timestamp.toDateString(),
      time: timestamp.toLocaleTimeString(),
      timeAgo: timeAgo(timestamp),
    },
  };
}
