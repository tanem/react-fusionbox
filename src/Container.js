import React, { PropTypes } from 'react';

export default function Container(props) {

  const {
    children,
    containerRef,
    onContainerKeyDown
  } = props;

  const style = {
    position: 'relative'
  };

  return (
    <div
      className={'Fusionbox-container'}
      ref={containerRef}
      onKeyDown={onContainerKeyDown}
      role={'combobox'}
      style={style}>
      {children}
    </div>
  );

}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  containerRef: PropTypes.func.isRequired,
  onContainerKeyDown: PropTypes.func.isRequired
};
