// components/Walkthrough.js
import React from 'react';
import Joyride, { STATUS, ACTIONS, EVENTS } from 'react-joyride';
import { useWalkthrough } from '../contexts/WalkthroughContext';

const Walkthrough = () => {
  const { run, setRun, stepIndex, setStepIndex, steps } = useWalkthrough();

  const handleJoyrideCallback = (data) => {
    const { status, action, index, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Joyride
        steps={steps}
        run={run}
        stepIndex={stepIndex}
        continuous
        scrollToFirstStep
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
          },
          overlay: {
            pointerEvents: 'none', // Allow clicks to pass through
          },
          spotlight: {
            pointerEvents: 'auto', // Make spotlight clickable
          },
          tooltip: {
            pointerEvents: 'auto', // Make tooltip clickable
          },
        }}
      />
    </div>
  );
};

export default Walkthrough;
