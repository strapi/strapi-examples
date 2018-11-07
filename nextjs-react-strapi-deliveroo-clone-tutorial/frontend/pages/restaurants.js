/* /pages/restaurants.js */

import gql from "graphql-tag";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { withContext } from "../components/Context/AppProvider";
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from "reactstrap";
import Cart from "../components/Cart/Cart";
import defaultPage from "../hocs/defaultPage";

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
  }

  addItem(item) {
    this.props.context.addItem(item);
  }
  render() {
    const {
      data: { loading, error, restaurant },
      router,
      context,
      isAuthenticated
    } = this.props;
    if (error) return "Error Loading Dishes";

    if (restaurant) {
      return (
        <>
          <h1>{restaurant.name}</h1>
          <Row>
            <Col xs="9" style={{ padding: 0 }}>
              <div style={{ display: "inline-block" }} className="h-100">
                {restaurant.dishes.map(res => (
                  <Card
                    style={{ width: "30%", margin: "0 10px" }}
                    key={res._id}
                  >
                    <CardImg
                      top={true}
                      style={{ height: 250 }}
                      src={`http://localhost:1337${res.image.url}`}
                    />
                    <CardBody>
                      <CardTitle>{res.name}</CardTitle>
                      <CardText>{res.description}</CardText>
                    </CardBody>
                    <div className="card-footer">
                      <Button
                        onClick={this.addItem.bind(this, res)}
                        outline
                        color="primary"
                      >
                        + Add To Cart
                      </Button>

                      <style jsx>
                        {`
                          a {
                            color: white;
                          }
                          a:link {
                            text-decoration: none;
                            color: white;
                          }
                          .container-fluid {
                            margin-bottom: 30px;
                          }
                          .btn-outline-primary {
                            color: #007bff !important;
                          }
                          a:hover {
                            color: white !important;
                          }
                        `}
                      </style>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>
            <Col xs="3" style={{ padding: 0 }}>
              <div>
                <Cart isAuthenticated={isAuthenticated} />
              </div>
            </Col>
          </Row>
        </>
      );
    }
    return <h1>Loading</h1>;
  }
}

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      _id
      name
      dishes {
        _id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)

export default compose(
  withRouter,
  defaultPage,
  withContext,
  graphql(GET_RESTAURANT_DISHES, {
    options: props => {
      return {
        variables: {
          id: props.router.query.id
        }
      };
    },
    props: ({ data }) => ({ data })
  })
)(Restaurants);