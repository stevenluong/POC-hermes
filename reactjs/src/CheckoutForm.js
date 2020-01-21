import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Form, Container, Button,Grid, Row, Col,Table, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false};
        this.email = React.createRef(); 
        this.name = React.createRef(); 
        this.amount= React.createRef(); 
    }

    async submit() {
        let {token} = await this.props.stripe.createToken({name: "Name"});
        var email = this.email.current.value;
        var name = this.name.current.value;
        var amount = this.amount.current.value;
        /*
        this.props.stripe.createToken({name : 'Name'}).then(({token, error}) => {
              if (error) {
                      // handle error
                  console.log(error);
                    } else {
                            // handle token
                          }
        });
        */
        //let response = await fetch("http://slapps.fr:9090/charge", {
        let response = await fetch("https://hermes-node.slapps.fr/charge", {
            method: "POST",
        //    mode: "no-cors",
            headers: {"Content-Type": "text/plain"},
            body: JSON.stringify({
                token: token.id,
                name: name,
                email:email,
                amount:amount
            })
        });

        if (response.ok || response.type=="opaque") console.log("Purchase Complete!");
        else console.log(response);
        if (response.ok || response.type=="opaque") this.setState({complete: true});
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;
        return (
                <Container>
                <Form>
                <Row>
                <Col sm={3}>
                <Form.Label>Name and Surname</Form.Label>
                </Col>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Your full name" ref={this.name}/>
                </Col>
                </Row>
                <Row>
                <Col sm={3}>
                <Form.Label>Email address</Form.Label>
                </Col>
                <Col sm={9}>
                <Form.Control type="email" placeholder="Your email" ref={this.email} />
                </Col>
                </Row>
                <Row>
                <Col sm={3}>
                <Form.Label>Amount</Form.Label>
                </Col>
                <Col sm={9}>
                <Form.Control type="number" placeholder="10.00" ref={this.amount}/>
                </Col>
                </Row>
                <Row>
                <Col sm={3}>
                <Form.Label>Card details</Form.Label>
                </Col>
                <Col sm={9}>
                <CardElement className="form-control" hidePostalCode={true} />
                </Col>
                </Row>

                <Row>
                <Col>
                <Button variant="primary" onClick={()=>this.submit()}>Confirm & Pay</Button>
                </Col>
                </Row>
                </Form>
                </Container>

               );
    }
}

export default injectStripe(CheckoutForm);
