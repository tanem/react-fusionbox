import React, { Component, PropTypes } from 'react';
import escape from 'escape-string-regexp';

import Container from './Container';
import HiddenInput from './HiddenInput';
import InputLabel from './InputLabel';
import Input from './Input';
import ButtonLabel from './ButtonLabel';
import Button from './Button';
import Listbox from './Listbox';

export default class Fusionbox extends Component {

  static defaultProps = {
    buttonLabelText: 'Open list',
    hiddenInputName: 'fusionbox',
    initialIsListboxVisible: false,
    initialSelectedValue: '',
    inputLabelText: 'Fusionbox',
    listboxId: 'Fusionbox-listbox'
  }

  static propTypes = {
    buttonLabelText: PropTypes.string,
    hiddenInputName: PropTypes.string,
    initialData: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired,
    initialIsListboxVisible: PropTypes.bool,
    initialSelectedValue: PropTypes.string,
    inputLabelStyle: PropTypes.object,
    inputLabelText: PropTypes.string,
    listboxId: PropTypes.string
  }

  state = {
    data: this.props.initialData,
    hoveredOptionValue: '',
    isListboxVisible: this.props.initialIsListboxVisible,
    selectedValue: this.props.initialSelectedValue
  }

  componentWillMount() {

    const selectedOption = this.state.data.find((option) => {
      return option.value === this.state.selectedValue;
    });

    this.setState({
      displayedLabel: selectedOption ? selectedOption.label : ''
    });

  }

  render() {
    return (
      <Container
        containerRef={this.storeContainerRef}
        onContainerKeyDown={this.handleContainerKeyDown}>
        <HiddenInput
          name={this.props.hiddenInputName}
          value={this.state.selectedValue}
        />
        <InputLabel
          style={this.props.inputLabelStyle}
          text={this.props.inputLabelText}>
          <Input
            inputRef={this.storeInputRef}
            onInputChange={this.handleInputChange}
            value={this.state.displayedLabel}
          />
        </InputLabel>
        <ButtonLabel
          text={this.props.buttonLabelText}>
          <Button
            listboxId={this.props.listboxId}
            labelText={this.props.buttonLabelText}
            onButtonClick={this.handleButtonClick}
            onButtonMouseDown={this.handleButtonMouseDown}
          />
        </ButtonLabel>
        <Listbox
          data={this.state.data}
          hoveredOptionValue={this.state.hoveredOptionValue}
          id={this.props.listboxId}
          isVisible={this.state.isListboxVisible}
          onOptionClick={this.handleOptionClick}
          onOptionMouseDown={this.handleOptionMouseDown}
          onOptionMouseMove={this.handleOptionMouseMove}
        />
      </Container>
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  storeContainerRef = (container) => {
    if (container) {
      this.container = container;
    }
  }

  storeInputRef = (input) => {
    if (input) {
      this.input = input;
    }
  }

  // TOOD: This probably shouldn't be showing unfiltered data any more?
  handleButtonClick = () => {
    this.setState({
      data: this.props.initialData,
      isListboxVisible: !this.state.isListboxVisible
    });
  }

  handleButtonMouseDown = (event) => {
    event.preventDefault();
    this.input.focus();
  }

  handleDocumentClick = (event) => {
    if (!this.container.contains(event.target)) {
      this.setState({
        isListboxVisible: false
      });
    }
  }

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    const regex = new RegExp(`^${escape(inputValue)}`, 'i');
    const filteredData = this.props.initialData
      .filter(({ label }) => regex.test(label));
    const isListboxVisible = !!filteredData.length;
    const selectedValue = '';

    this.setState({
      data: filteredData,
      displayedLabel: inputValue,
      isListboxVisible,
      selectedValue
    });
  }

  handleOptionClick = ({ label, value }) => {
    this.setState({
      displayedLabel: label,
      hoveredOptionValue: value,
      isListboxVisible: false,
      selectedValue: value
    });
  }

  handleOptionMouseDown = (event) => {
    event.preventDefault();
    this.input.focus();
  }

  handleOptionMouseMove = ({ value }) => {
    this.setState({
      hoveredOptionValue: value
    });
  }

  handleContainerKeyDown = ({ altKey, key }) => {

    const {
      data,
      hoveredOptionValue,
      isListboxVisible,
      selectedValue
    } = this.state;

    const hoveredOptionIndex = data.findIndex(({ value }) => {
      return hoveredOptionValue === value;
    });

    const selectedOptionIndex = data.findIndex(({ value }) => {
      return selectedValue === value;
    });

    if (altKey && key === 'ArrowDown') {
      return this.setState({
        isListboxVisible: true
      });
    }

    if (altKey && key === 'ArrowUp') {
      return this.setState({
        isListboxVisible: false
      });
    }

    if (key === 'ArrowUp') {

      if (isListboxVisible) {

        const newOption = hoveredOptionIndex - 1 < 0 ?
          data[data.length - 1] :
          data[hoveredOptionIndex - 1];

        return this.setState({
          displayedLabel: newOption.label,
          hoveredOptionValue: newOption.value
        });

      }

      if (!isListboxVisible && data.length) {

        const newOption = selectedOptionIndex - 1 < 0 ?
          data[data.length - 1] :
          data[selectedOptionIndex - 1];

        return this.setState({
          displayedLabel: newOption.label,
          hoveredOptionValue: newOption.value,
          selectedValue: newOption.value
        });

      }

    }

    if (key === 'ArrowDown') {

      if (isListboxVisible) {

        const newOption = hoveredOptionIndex + 1 >= data.length ?
          data[0] :
          data[hoveredOptionIndex + 1];

        return this.setState({
          displayedLabel: newOption.label,
          hoveredOptionValue: newOption.value
        });

      }

      if (!isListboxVisible && data.length) {

        const newOption = selectedOptionIndex + 1 >= data.length ?
          data[0] :
          data[selectedOptionIndex + 1];

        return this.setState({
          displayedLabel: newOption.label,
          hoveredOptionValue: newOption.value,
          selectedValue: newOption.value
        });

      }

    }

    if (key === 'Home') {

      const {
        label,
        value
      } = data[0];

      if (isListboxVisible) {
        return this.setState({
          displayedLabel: label,
          hoveredOptionValue: value
        });
      }

      if (!isListboxVisible) {
        return this.setState({
          displayedLabel: label,
          hoveredOptionValue: value,
          selectedValue: value
        });
      }

    }

    if (key === 'End') {

      const {
        label,
        value
      } = data[data.length - 1];

      if (isListboxVisible) {
        return this.setState({
          displayedLabel: label,
          hoveredOptionValue: value
        });
      }

      if (!isListboxVisible) {
        return this.setState({
          displayedLabel: label,
          hoveredOptionValue: value,
          selectedValue: value
        });
      }

    }

    if (key === 'Enter') {

      if (isListboxVisible && hoveredOptionIndex >= 0) {
        return this.setState({
          isListboxVisible: false,
          selectedValue: data[hoveredOptionIndex] ?
           data[hoveredOptionIndex].value : ''
        });
      }

      if (!isListboxVisible) {
        return this.setState({
          isListboxVisible: true
        });
      }

    }

    if (key === 'Escape') {
      return this.setState({
        displayedLabel: data[selectedOptionIndex] ?
          data[selectedOptionIndex].label : '',
        isListboxVisible: false
      });
    }

    if (key === 'Tab') {

      if (isListboxVisible && hoveredOptionIndex >= 0) {
        return this.setState({
          isListboxVisible: false,
          selectedValue: data[hoveredOptionIndex] ?
           data[hoveredOptionIndex].value : ''
        });
      }

    }

  }

}
