import React, { PropTypes } from 'react';

export default function Container(props) {

  const {
    children,
    containerRef,
    onContainerKeyDown
  } = props;

  return (
    <div
      className={'Fusionbox-container'}
      ref={containerRef}
      onKeyDown={onContainerKeyDown}
      role={'combobox'}
      style={{
        position: 'relative'
      }}>
      {children}
    </div>
  );

}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  containerRef: PropTypes.func.isRequired,
  onContainerKeyDown: PropTypes.func.isRequired
};
