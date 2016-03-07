import React from 'react';
import ReactDOM from 'react-dom';

import Fusionbox from '../src/Fusionbox';
import data from './data';

ReactDOM.render(
  <div>
    <Fusionbox
      initialData={data}
      inputLabelText={'simple'}
      inputLabelStyle={{
        marginLeft: -50,
        width: 50
      }}
    />
  </div>,
  document.querySelector('.simple')
);
