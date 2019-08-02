import React, { Component } from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';
import { Form, Container, Button,Grid, Row, Col,Table, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import CheckoutForm from './CheckoutForm';

import './App.css';

class App extends Component {
    render() {
        return (
                <div className="App">
                <h1>Hermes</h1>
                <StripeProvider apiKey="pk_test_D0nrXO4ceddRHzOL4JQY65GZ00VE2nosVh">
                <Elements>
                <CheckoutForm />
                </Elements>
                </StripeProvider>
                </div>
                );
    }

}
export default App;
