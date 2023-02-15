import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetail from "./components/SpotDetails";
import CreateSpot from "./components/SpotDetails/createSpotForm";
import ManageMySpots from "./components/SpotDetails/mySpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path={'/'}>
          <LandingPage />
          </Route>

          <Route path={`/spots/:spotId`}>
            <SpotDetail />
          </Route>

          <Route path={'/user/current/spots'}>
            <ManageMySpots />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
