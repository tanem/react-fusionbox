import React from 'react';
import { expect } from 'chai';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';

import Fusionbox from '../src/Fusionbox';

const getInput = (fusionbox) => findRenderedDOMComponentWithClass(fusionbox, 'Fusionbox-input');
const getButton = (fusionbox) => findRenderedDOMComponentWithClass(fusionbox, 'Fusionbox-button');
const getDropdown = (fusionbox) => findRenderedDOMComponentWithClass(fusionbox, 'Fusionbox-dropdown');
const getOptions = (fusionbox) => scryRenderedDOMComponentsWithClass(fusionbox, 'Fusionbox-option');
const getInitialData = () => {
  return [
    { label: 'Afghanistan', value: 'AF' },
    { label: 'Bahamas', value: 'BS' },
    { label: 'Cambodia', value: 'KH' }
  ];
};
const getInnerText = (components) => {
  if (Array.isArray(components)) {
    return components.reduce((memo, component) => memo += component.innerText, '');
  }
  return components.innerText;
};

describe('fusionbox', () => {
  describe('when the input receives focus', () => {
    describe('and the dropdown is closed', () => {
      it('should not open the dropdown', () => {
        const fusionbox = renderIntoDocument(
          <Fusionbox initialData={getInitialData()} />
        );

        Simulate.focus(getInput(fusionbox));

        expect(getDropdown(fusionbox).style.display).to.equal('none');
      });
    });

    describe('and the dropdown is open', () => {
      it('should not close the dropdown', () => {
        const fusionbox = renderIntoDocument(
          <Fusionbox
            initialData={getInitialData()}
            initialIsDropdownVisible={true}
          />
        );

        Simulate.focus(getInput(fusionbox));

        expect(getDropdown(fusionbox).style.display).to.equal('block');
      });
    });
  });

  describe('when input value is changed via the keyboard', () => {
    describe('and matches an option', () => {
      it('should open the dropdown', () => {
        const fusionbox = renderIntoDocument(
          <Fusionbox initialData={getInitialData()} />
        );

        Simulate.change(getInput(fusionbox), { target: { value: 'Bah' } });

        expect(getDropdown(fusionbox).style.display).to.equal('block');
      });

      it('should only show matched options in the dropdown', () => {
        const fusionbox = renderIntoDocument(
          <Fusionbox initialData={getInitialData()} />
        );

        Simulate.change(getInput(fusionbox), { target: { value: 'Bah' } });

        expect(getInnerText(getOptions(fusionbox))).to.equal('Bahamas');
      });

      it('should highlight the first option', () => {
        const fusionbox = renderIntoDocument(
          <Fusionbox initialData={getInitialData()} />
        );

        Simulate.change(getInput(fusionbox), { target: { value: 'Bah' } });

        expect(
          getOptions(fusionbox)[0]
            .style
            .backgroundColor
        ).to.equal('rgb(245, 245, 245)');
      });
    });

    describe('and does not match an option', () => {
      it('should close the dropdown', () => {
        const fusionbox = renderIntoDocument(
          <Fusionbox initialData={getInitialData()} />
        );

        Simulate.change(getInput(fusionbox), { target: { value: 'Baz' } });

        expect(getDropdown(fusionbox).style.display).to.equal('none');
      });
    });
  });

  describe('button click', () => {
    describe('when the dropdown is open', () => {
      it('should close the dropdown', () => {
        const fusionbox = renderIntoDocument(
          <Fusionbox
            initialData={getInitialData()}
            initialIsDropdownVisible={true}
          />
        );

        Simulate.click(getButton(fusionbox));

        expect(getDropdown(fusionbox).style.display).to.equal('none');
      });
    });

    describe('when the dropdown is closed', () => {
      describe('and a selection has not been made', () => {
        it('should open the unfiltered dropdown', () => {
          const fusionbox = renderIntoDocument(
            <Fusionbox initialData={getInitialData()} />
          );

          Simulate.click(getButton(fusionbox));

          expect(getDropdown(fusionbox).style.display).to.equal('block');
          expect(getOptions(fusionbox).length).to.equal(getInitialData().length);
        });

        it('should highlight the first option', () => {
          const fusionbox = renderIntoDocument(
            <Fusionbox initialData={getInitialData()} />
          );

          Simulate.click(getButton(fusionbox));

          expect(
            getOptions(fusionbox)[0]
              .style
              .backgroundColor
          ).to.equal('rgb(245, 245, 245)');
        });
      });

      describe('and a selection has been made', () => {
        it('should open the unfiltered dropdown', () => {
          const fusionbox = renderIntoDocument(
            <Fusionbox initialData={getInitialData()} />
          );

          Simulate.click(getButton(fusionbox));

          expect(getDropdown(fusionbox).style.display).to.equal('block');
          expect(getOptions(fusionbox).length).to.equal(getInitialData().length);
        });

        it('should highlight the selected option', () => {
          const fusionbox = renderIntoDocument(
            <Fusionbox
              initialData={getInitialData()}
              initialSelectedValue={'BS'}
            />
          );

          Simulate.click(getButton(fusionbox));

          expect(
            getOptions(fusionbox)[1]
              .style
              .backgroundColor
          ).to.equal('rgb(245, 245, 245)');
        });
      });
    });
  });

  describe('when the dropdown is open', () => {
    describe('and the first option is hovered', () => {
      describe('and the down arrow is pressed', () => {
        it('should unhover the first option');

        it('should hover the second option');
      });

      describe('and the up arrow is pressed', () => {
        it('should unhover the first option');

        it('should hover the last option');
      });

      describe('and the enter key is pressed', () => {
        it('should close the dropdown', () => {
          const fusionbox = renderIntoDocument(
            <Fusionbox
              initialData={getInitialData()}
              initialIsDropdownVisible={true}
            />
          );

          // keypress / enter
          Simulate.keyDown(
            getOptions(fusionbox)[0],
            { key: 'Enter', keyCode: 13, which: 13 }
          );

          // Simulate.click(getButton(fusionbox));

          expect(getDropdown(fusionbox).style.display).to.equal('none');
        });

        it('should set the input value to the first option label');

        it('should set the selected value to the first option value');
      });

      describe('and the mouse enters the second option', () => {
        it('should unhover the first option');

        it('should hover the second option');

        describe('and the mouse leaves the dropdown', () => {
          it('should unhover the second option');
        });

        describe('and the mouse is clicked', () => {
          it('should close the dropdown');

          it('should set the input value to the second option label');

          it('should set the selected value to the second option value');
        });
      });
    });

    describe('and the last option is hovered', () => {
      describe('and the down arrow is pressed', () => {
        it('should unhover the last option');

        it('should hover the first option');
      });

      describe('and the up arrow is pressed', () => {
        it('should unhover the last option');

        it('should hover the second-to-last option');
      });
    });
  });
});
