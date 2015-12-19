import React, { PropTypes } from 'react';

export default function ButtonLabel(props) {

  const {
    children,
    text
  } = props;

  return (
    <label>
      <span
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          margin: -1,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          width: 1
        }}>
        {text}
      </span>
      {children}
    </label>
  );

}

ButtonLabel.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired
};
