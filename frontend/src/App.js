import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetail from "./components/SpotDetails";
import ManageMySpots from "./components/SpotDetails/mySpots";
import ManageMyReviews from "./components/ReviewDetails/myReview";
import ManageMyBookings from "./components/BookingDetails/myBookings";

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

          <Route path={'/user/current/reviews'}>
          <ManageMyReviews />
          </Route>

          <Route path={'/user/current/bookings'}>
          <ManageMyBookings />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
