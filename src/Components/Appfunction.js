import React, { useState, useEffect } from "react";

const Appfunction = props => {
  const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null
  };
  let mounted = true;
  const [count, setCount] = useState(0);
  const [isOn, setisOn] = useState(false);
  const [mouseposition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.online);
  const [{ latitude, longitude, speed }, setLocation] = useState(
    initialLocationState
  );

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    setisOn(previsOn => !previsOn);
  };

  const handlemousemove = e => {
    setMousePosition(prevObj => {
      return {
        x: e.pageX,
        y: e.pageY
      };
    });
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  const handleLocation = e => {
    if (mounted) {
      setLocation(prevObj => {
        return {
          latitude: e.coords.latitude,
          longitude: e.coords.longitude,
          speed: e.coords.speed
        };
      });
    }
  };

  useEffect(() => {
    document.title = `you have clicked ${count} times`;
    console.log("running");
    window.addEventListener("mousemove", handlemousemove);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    navigator.geolocation.getCurrentPosition(handleLocation);
    const watchId = navigator.geolocation.watchPosition(handleLocation);

    return () => {
      console.log("running ends");
      window.removeEventListener("mousemove", handlemousemove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    };
  }, [count]);

  const divStyle = {
    height: "50px",
    width: "50px"
  };

  return (
    <div>
      <h2>Counter</h2>
      <button onClick={increment}>I was clicked {count} times.... </button>
      <h2>Toggle Light</h2>
      <img
        onClick={toggleLight}
        style={divStyle}
        src={
          isOn
            ? "https://icon.now.sh/highlight/fd0"
            : "https://icon.now.sh/highlight/aaa"
        }
      />
      <h2>Mouse Position</h2>
      <p>Position x:{mouseposition.x}</p>
      <p>Position y:{mouseposition.y}</p>

      <h2>Network Status</h2>
      <p>
        You are <strong>{status ? "Online" : "Offline"}</strong>
      </p>

      <h2>Geo Location</h2>
      <p>Latitude:{latitude}</p>
      <p>Longitude:{longitude}</p>
      <p>Speed:{speed ? speed : 0}</p>
    </div>
  );
};

export default Appfunction;
