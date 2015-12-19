import React, { PropTypes } from 'react';

export default function InputLabel(props) {

  const {
    children,
    style,
    text
  } = props;

  const defaultStyle = {
    display: 'inline-block',
    height: 30,
    lineHeight: '30px',
    marginLeft: -75,
    width: 75
  };

  return (
    <label
      style={{ ...defaultStyle, ...style }}>
      <span>{text}</span>
      {children}
    </label>
  );

}

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  text: PropTypes.string.isRequired
};
