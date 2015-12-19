import React, { PropTypes } from 'react';

export default function Button(props) {

  const {
    listboxId,
    onButtonClick,
    onButtonMouseDown
  } = props;

  return (
    <button
      aria-controls={listboxId}
      className={'Fusionbox-button'}
      onClick={onButtonClick}
      onMouseDown={onButtonMouseDown}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        height: 30,
        outlineOffset: -2,
        padding: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        width: 24
      }}
      tabIndex={-1}>
      <svg
        style={{
          width: 10
        }}
        viewBox="0 0 23 14"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M11.318 13.43l.003.005L22.636 2.12 20.515 0l-9.197 9.196L2.12 0 0 2.12l11.314 11.315.004-.004z" />
      </svg>
    </button>
  );

}

Button.propTypes = {
  listboxId: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired
};
