/* components/Checkout/cardsection.js */

import React from "react";

import { CardElement, CardNumberElement } from "react-stripe-elements";
import { injectStripe } from "react-stripe-elements";

class CardSection extends React.Component {
  render() {
    return (
      <div>
        <div>
          <label htmlFor="card-element">Credit or debit card</label>

          <div>
            <fieldset style={{ border: "none" }}>
              <div className="form-row">
                <div id="card-element" style={{ width: "100%" }}>
                  <CardElement
                    style={{ width: "100%", base: { fontSize: "18px" } }}
                  />
                </div>
                <br />
                <div className="order-button-wrapper">
                  <button onClick={this.props.submitOrder}>
                    Confirm order
                  </button>
                </div>
                {this.props.stripeError ? (
                  <div>{this.props.stripeError.toString()}</div>
                ) : null}
                <div id="card-errors" role="alert" />
              </div>
            </fieldset>
          </div>
        </div>
        <style jsx>
          {`
            .order-button-wrapper {
              display: flex;
              width: 100%;
              align-items: flex-end;
              justify-content: flex-end;
            }
          `}
        </style>
      </div>
    );
  }
}
export default injectStripe(CardSection);