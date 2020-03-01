import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Route, useLocation } from 'react-router';
import { hot } from 'react-hot-loader/root';

// Hooks split the code based on what it is doing rather than a lifecycle method name. 
// React will apply every effect used by the component, in the order they were specified.

// Run an effect and clean it up only once (on mount and unmount):
//   * pass empty '[]' array as second 'useEffect' argument
//   * tells React the effect doesn't depend on props or state, so it never needs to re-run
//   * the props and state inside effect will always have their initial values
//   * helps avoid re-running effects too often

const RouterTriggerTEST = (props) => {

  const { triggerProp } = props;
  const { children } = props;
  const location = useLocation();
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > props: ', props);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > PROPS > triggerProp: ', triggerProp);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > PROPS > children: ', children);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > PROPS > useLocation: ', location);

  const [needTrigger, setNeedTrigger] = useState(false);
  // const [prevLocationState, setPreviousLocationState] = useState(props.location);
  const [locationState, setLocationState] = useState(null);
  const [prevLocationState, setPreviousLocationState] = useState(null);
  // const {location: { pathname, search }} = props;

  const navigated = !locationState || `${location.pathname}${location.search}` !== `${locationState.pathname}${locationState.search}`;

  // const v = locationState || location;
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > getDerivedStateFromProps() > locationState: ', locationState);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > getDerivedStateFromProps() > navigated: ', navigated);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > getDerivedStateFromProps() > prevLocationState: ', v);

  // detect a 'navigation'
  if (navigated) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > getDerivedStateFromProps() > navigated TRUE: ', navigated);
    setLocationState(location);
    setPreviousLocationState(locationState || location);
    // initiate an effect on 'needTrigger'
    setNeedTrigger(true);
  }

  // ================================================================================

  // lifecycle method 'shouldComponentUpdate()' used to check state for a change
  // if state has changed, React re-renders the component, otherwise nothing

  // isolate effects on 'needTrigger'
  // evaluate for state change and do somethig (callback)
  // no 'needTrigger' change, skip the effect

  // only re-run the effect if 'needTrigger' changes
  // React will compare [needTrigger] from the previous render and [needTrigger] from the next render
  // if all items in the array are the same (false === false), React skips the effect
  // that's an optimization

  // Is it safe to omit functions from the list of dependencies?
  // https://github.com/facebook/react/issues/14920
  useEffect(
    () => {
      // componentDidMount
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > (componentDidMount) > navigated: ', navigated);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > (componentDidUpdate) > needTrigger ???: ', needTrigger);

      // componentDidUpdate
      if (needTrigger) {
        setNeedTrigger(false);
      }

      // componentDidUpdate
      if (!needTrigger) {
        triggerProp(location.pathname)
          .catch(err => console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > (componentDidUpdate) > triggerProp > ERROR:', err))
          .then(() => {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > (componentDidUpdate) > triggerProp > SUCCESS');
            // clear previousLocation so the next screen renders
            setPreviousLocationState(null);
          });
      }

      // componentWillUnmount
      return () => {
        // some effects might require cleanup
        console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTriggerTEST > useEffect() > (componentWillUnmount) > cleanup phase');
      };
    },
    [needTrigger, location.pathname, navigated, triggerProp]
  );

  // ================================================================================

  return <Route location={prevLocationState || location} render={() => children} />;
}

export default hot(RouterTriggerTEST);
