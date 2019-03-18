import React from 'react';
import { connect } from "react-redux";

import axios from 'axios';

import '@patternfly/react-core/dist/styles/base.css';
import { Form, FormGroup, ActionGroup, TextInput, Button } from '@patternfly/react-core';
import { Title, Card, CardHeader, CardBody } from '@patternfly/react-core';
import { List, ListItem } from '@patternfly/react-core';

class Event extends React.Component {
    render() {
        return (
            <ListItem>
                Event: ID: {this.props.event.id},
                Type: {this.props.event.type},
                Repo: {this.props.event.repo.name}
            </ListItem>
        );
    }
}

class ListEvents extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Title size="md">GitHub ID: {this.props.github_id}</Title>
                <List>
                    {this.props.history.map(
                        (event) => <Event
                            key={event.id}
                            event={event} />)
                    }
                </List>
            </React.Fragment>
        );
    }
}

class SelectIdForm extends React.Component {

    handleChange = (value) => {
        this.props.onInputChange(value);
    }

    handleSubmit = (event) => {
        this.props.onInputSubmit();
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup
                    label="Required GitHub username"
                    isRequired
                    fieldId="github-id"
                    helperText="Please provide the GitHub username"
                >
                    <TextInput
                        id="github-id"
                        type="text"
                        onChange={this.handleChange} />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary">Submit</Button>
                </ActionGroup>
            </Form>
        );
    }
}
class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <Title size="lg">View 90 days history of a GitHub user</Title>
                    </CardHeader>
                    <CardBody>
                        <SelectIdForm
                            onInputChange={this.props.handleInputChange}
                            onInputSubmit={this.props.handleInputSubmit} />
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <ListEvents
                            github_id={this.props.github_id}
                            history={this.props.history} />
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

const fetchHistory = (dispatch) => {
    return axios.get(
        'https://api.github.com/users/morucci/events')
        .then(res => {
            dispatch({
                type: 'INPUT_SUBMIT',
                value: res.data
            });
        })
}

const mapStateToProps = state => {
    return {
        github_id: state.github_id,
        typed_github_id: state.typed_github_id,
        history: state.history
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (input_value) => dispatch(
            {
                type: 'INPUT_CHANGE',
                value: input_value
            }),
        handleInputSubmit: (github_id) => fetchHistory(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
