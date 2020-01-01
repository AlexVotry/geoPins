import React from "react";

import Map from '../components/Map';
import Header from '../components/Header';
import withRoot from "../withRoot";

const App = () => {
  return (
    <>
    <Header />
    <Map />
    </>
  )
};

export default withRoot(App);
