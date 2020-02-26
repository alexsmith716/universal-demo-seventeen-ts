import React, { useState, useEffect, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Route, useLocation } from 'react-router';
import { hot } from 'react-hot-loader/root';

const RouterTriggerTEST = (props) => {

  const { triggerProp } = props;
  const { children } = props;
  const location = useLocation();
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > props: ', props);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > PROPS > triggerProp: ', triggerProp);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > PROPS > children: ', children);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > PROPS > useLocation: ', location);

  const [needTrigger, setNeedTrigger] = useState(false);
  // const [prevLocationState, setPrevLocationState] = useState(props.location);
  const [locationState, setLocationState] = useState(null);
  const [prevLocationState, setPrevLocationState] = useState(null);
  // const {location: { pathname, search }} = props;

  const navigated = !locationState || `${location.pathname}${location.search}` !== `${locationState.pathname}${locationState.search}`;

  const v = locationState || location;
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > getDerivedStateFromProps() > locationState: ', locationState);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > getDerivedStateFromProps() > navigated: ', navigated);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > getDerivedStateFromProps() > prevLocationState: ', v);

  if (navigated) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > getDerivedStateFromProps() > navigated !!TRUE!!: ', navigated);
    setLocationState(location);
    setPrevLocationState(locationState || location);
    setNeedTrigger(true);
  }

  // ================================================================================

  // lifecycle method 'shouldComponentUpdate()' used to check state for a change
  // if state has changed, React re-renders the component, otherwise nothing

  // isolate effects on 'needTrigger'
  // evaluate for state change and do somethig (callback)
  useEffect(
    () => {
      // componentDidMount
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > navigated: ', navigated);
      // componentDidUpdate
      if (needTrigger) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > needTrigger > TRUE: ', needTrigger);
        setNeedTrigger(false);
      }
      // componentDidUpdate
      if (!needTrigger) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > needTrigger > FALSE: ', needTrigger);
        triggerProp(location.pathname)
          .catch(err => console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > triggerProp > ERROR:', err))
          .then(() => {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > triggerProp > SUCCESS');
            // clear previousLocation so the next screen renders
            setPrevLocationState(null);
          });
      }

      return () => {
        // componentWillUnmount
        // some effects might require cleanup
        console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > cleanup phase');
      };
    },
    [needTrigger]
  );

  // ================================================================================

  return <Route location={prevLocationState || location} render={() => children} />;
}

export default hot(RouterTriggerTEST);
