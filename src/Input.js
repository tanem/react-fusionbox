import React, { PropTypes } from 'react';

export default function Input(props) {

  const {
    inputRef,
    onInputChange,
    value
  } = props;

  return (
    <input
      aria-autocomplete={'inline'}
      className={'Fusionbox-input'}
      maxLength="255"
      onChange={onInputChange}
      ref={inputRef}
      style={{
        border: '1px solid #a8a9ac',
        boxSizing: 'border-box',
        fontSize: 'inherit',
        left: 0,
        position: 'absolute',
        top: 0,
        height: 30,
        padding: '3px 23px 3px 3px',
        width: '100%'
      }}
      tabIndex={0}
      type="text"
      value={value} />
  );

}

Input.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
