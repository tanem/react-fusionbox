import React, { PropTypes } from 'react';

export default function Option(props) {

  const {
    data,
    isHovered,
    onOptionClick,
    onOptionMouseDown,
    onOptionMouseMove
  } = props;

  const style = {
    backgroundColor: isHovered ?
      'rgba(245, 245, 245, 1)' :
      'rgba(0, 0, 0, 0)',
    color: 'inherit',
    display: 'block',
    outlineOffset: -2,
    padding: 3,
    textDecoration: 'none'
  };

  return (
    <li>
      <a
        className={'Fusionbox-option'}
        href="#"
        onClick={() => onOptionClick(data)}
        onMouseDown={onOptionMouseDown}
        onMouseMove={() => onOptionMouseMove(data)}
        role={'option'}
        style={style}
        tabIndex={-1}>
        {data.label}
      </a>
    </li>
  );

}

Option.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  isHovered: PropTypes.bool.isRequired,
  onOptionClick: PropTypes.func.isRequired,
  onOptionMouseDown: PropTypes.func.isRequired,
  onOptionMouseMove: PropTypes.func.isRequired
};
