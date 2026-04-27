import React from 'react';

export interface ErrorTriggerState {
  isError: boolean;
}

class ErrorTrigger extends React.Component<object, ErrorTriggerState> {
  constructor(props: object) {
    super(props);

    this.state = {
      isError: false,
    };
  }

  #onTriggerError = () => {
    this.setState({
      isError: true,
    });
  };

  render() {
    if (this.state.isError) {
      throw new Error('Test crash triggered by user!');
    }

    return (
      <button
        onClick={this.#onTriggerError}
        className={`button ${this.state.isError ? 'button--error' : ''}`}
      >
        <svg>
          <use href="/icons.svg#bomb" />
        </svg>
        triggers an error
      </button>
    );
  }
}

export default ErrorTrigger;
