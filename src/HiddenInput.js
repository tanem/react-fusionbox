import React, { PropTypes } from 'react';

export default function HiddenInput(props) {
  return (
    <input
      {...props}
      className={'Fusionbox-hiddenInput'}
      type="hidden"
    />
  );
}

HiddenInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
