import React, { PropTypes } from 'react';

import Option from './Option';

export default function Listbox(props) {

  const {
    data,
    hoveredOptionValue,
    id,
    isVisible,
    onOptionClick,
    onOptionMouseDown,
    onOptionMouseMove
  } = props;

  return (
    <ul
      aria-expanded={isVisible}
      className={'Fusionbox-listbox'}
      id={id}
      role={'listbox'}
      style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #a8a9ac',
        borderLeft: '1px solid #a8a9ac',
        borderRight: '1px solid #a8a9ac',
        boxSizing: 'border-box',
        display: isVisible ? 'block' : 'none',
        listStyleType: 'none',
        marginBottom: 0,
        marginTop: 0,
        paddingLeft: 0,
        position: 'absolute',
        top: 29,
        width: '100%',
        zIndex: 1
      }}
      tabIndex={-1}>
      {data.map((option, i) => {
        return (
          <Option
            data={option}
            isHovered={hoveredOptionValue === option.value}
            onOptionClick={onOptionClick}
            onOptionMouseDown={onOptionMouseDown}
            onOptionMouseMove={onOptionMouseMove}
            key={i}
          />
        );
      })}
    </ul>
  );

}

Listbox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  id: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  hoveredOptionValue: PropTypes.string.isRequired,
  onOptionClick: PropTypes.func.isRequired,
  onOptionMouseDown: PropTypes.func.isRequired,
  onOptionMouseMove: PropTypes.func.isRequired
};
