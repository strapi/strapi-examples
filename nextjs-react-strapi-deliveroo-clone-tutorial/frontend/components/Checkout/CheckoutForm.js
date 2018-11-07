/* /components/Checkout/CheckoutForm.js */

import React from "react";

import CardSection from "./CardSection";

import { FormGroup, Label, Input, FormText, Row, Col } from "reactstrap";
import { injectStripe } from "react-stripe-elements";
import Strapi from "strapi-sdk-javascript/build/main";
import Router from "next/router";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
/* components/Checkout/CheckoutForm.js */
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        address: "",
        city: "",
        state: "",
        stripe_id: ""
      },
      error: ""
    };
    this.submitOrder = this.submitOrder.bind(this);
  }

  onChange(propertyName, e) {
    const { data } = this.state;
    data[propertyName] = e.target.value;
    this.setState({ data });
  }

  submitOrder() {
    const { context } = this.props;
    const { data } = this.state;
    console.log(context);
    console.log(this.props.stripe.createToken())
    this.props.stripe.createToken()
    .then(res => {
      strapi
        .createEntry("orders", {
          amount: context.total,
          dishes: context.items,
          address: data.address,
          city: data.city,
          state: data.state,
          token: res.token.id
        })
        .then(Router.push("/"));
    })
    .catch(err => this.setState({ error: err}))
  }

  render() {
    return (
      <div className="paper">
        <h5>Your information:</h5>
        <hr />
        <FormGroup style={{ display: "flex" }}>
          <div style={{ flex: "0.90", marginRight: 10 }}>
            <Label>Address</Label>
            <Input onChange={this.onChange.bind(this, "address")} />
          </div>
        </FormGroup>
        <FormGroup style={{ display: "flex" }}>
          <div style={{ flex: "0.65", marginRight: "6%" }}>
            <Label>City</Label>
            <Input onChange={this.onChange.bind(this, "city")} />
          </div>
          <div style={{ flex: "0.25", marginRight: 0 }}>
            <Label>State</Label>
            <Input onChange={this.onChange.bind(this, "state")} />
          </div>
        </FormGroup>

        <CardSection
          context={this.props.context}
          data={this.state.data}
          submitOrder={this.submitOrder}
        />

        <style jsx global>
          {`
            .paper {
              border: 1px solid lightgray;
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                0px 2px 1px -1px rgba(0, 0, 0, 0.12);
              height: 550px;
              padding: 30px;
              background: #fafafa;
              border-radius: 6px;
              margin-top: 90px;
            }
            .form-half {
              flex: 0.5;
            }
            * {
              box-sizing: border-box;
            }
            body,
            html {
              background-color: #f6f9fc;
              font-size: 18px;
              font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            }
            h1 {
              color: #32325d;
              font-weight: 400;
              line-height: 50px;
              font-size: 40px;
              margin: 20px 0;
              padding: 0;
            }
            .Checkout {
              margin: 0 auto;
              max-width: 800px;
              box-sizing: border-box;
              padding: 0 5px;
            }
            label {
              color: #6b7c93;
              font-weight: 300;
              letter-spacing: 0.025em;
            }
            button {
              white-space: nowrap;
              border: 0;
              outline: 0;
              display: inline-block;
              height: 40px;
              line-height: 40px;
              padding: 0 14px;
              box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
                0 1px 3px rgba(0, 0, 0, 0.08);
              color: #fff;
              border-radius: 4px;
              font-size: 15px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.025em;
              background-color: #6772e5;
              text-decoration: none;
              -webkit-transition: all 150ms ease;
              transition: all 150ms ease;
              margin-top: 10px;
            }
            form {
              margin-bottom: 40px;
              padding-bottom: 40px;
              border-bottom: 3px solid #e6ebf1;
            }
            button:hover {
              color: #fff;
              cursor: pointer;
              background-color: #7795f8;
              transform: translateY(-1px);
              box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                0 3px 6px rgba(0, 0, 0, 0.08);
            }
            input,
            .StripeElement {
              display: block;
              margin: 10px 0 20px 0;
              max-width: 500px;
              padding: 10px 14px;
              font-size: 1em;
              font-family: "Source Code Pro", monospace;
              box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
                rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
              border: 0;
              outline: 0;
              border-radius: 4px;
              background: white;
            }
            input::placeholder {
              color: #aab7c4;
            }
            input:focus,
            .StripeElement--focus {
              box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
                rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
              -webkit-transition: all 150ms ease;
              transition: all 150ms ease;
            }
            .StripeElement.IdealBankElement,
            .StripeElement.PaymentRequestButton {
              padding: 0;
            }
          `}
        </style>
      </div>
    );
  }
}
export default injectStripe(CheckoutForm);