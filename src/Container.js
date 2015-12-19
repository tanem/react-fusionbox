import React, { PropTypes } from 'react';

export default function Container(props) {

  const {
    children,
    onContainerBlur,
    onContainerKeyDown
  } = props;

  return (
    <div
      className={'Fusionbox-container'}
      onBlur={onContainerBlur}
      onKeyDown={onContainerKeyDown}
      role={'combobox'}
      style={{
        position: 'relative'
      }}
      >
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  onContainerKeyDown: PropTypes.func.isRequired
};
