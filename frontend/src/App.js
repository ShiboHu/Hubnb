import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetail from "./components/SpotDetails";
import ManageMySpots from "./components/SpotDetails/mySpots";
import ManageMyBookings from "./components/BookingDetails/myBookings";
import CreateSpot from "./components/SpotDetails/createSpotForm";
import EditSpotForm from "./components/SpotDetails/editSpotForm";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      <Navigation isLoaded={isLoaded} />
      
      <ScrollToTop />
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

          <Route path={'/user/current/bookings'}>
          <ManageMyBookings />
          </Route>

          <Route path={'/create/spot'}>
            <CreateSpot />
          </Route>

          <Route path={'/spot/edit/:spotId'}>
          <EditSpotForm />  
          </Route>

        </Switch>
      )}

    </>
  );
}

export default App;
