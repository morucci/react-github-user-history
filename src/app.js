import React from 'react';
import { connect } from "react-redux";

import '@patternfly/react-core/dist/styles/base.css';
import { Form, FormGroup, ActionGroup, TextInput, Button } from '@patternfly/react-core';
import { Title, Card, CardHeader, CardBody } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Alert } from '@patternfly/react-core';

import { fetchHistoryAction } from './reducer'


class SelectIdForm extends React.Component {

    handleChange = (value) => {
        this.props.onInputChange(value);
    }

    handleSubmit = (event) => {
        this.props.onInputSubmit(this.props.github_id);
        event.preventDefault();
    }

    render() {
        // TextInput is complaining about missing value setting
        // but what value should I give as the state is in Redux ?
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
                        value={this.props.github_id}
                        onChange={this.handleChange} />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                </ActionGroup>
            </Form>
        );
    }
}


class EventsTable extends React.Component {
    render() {
        if ('status' in this.props.error_response) {
            const message = "Unable to fetch history. Server returned " +
                "status: " + this.props.error_response.status + " with " +
                "message: " + this.props.error_response.statusText
            return (
                <Alert variant="info" title={message} />
            )
        }
        if (!this.props.typed_github_id) {
            return (<div></div>)
        }
        const caption = "History of user " + this.props.typed_github_id
        const columns = ['Event ID', 'Action Type', 'Repository']
        const rows = this.props.history.map(
            (e) => [e.id, e.type, e.repo.name])
        return (
            <Table caption={caption} cells={columns} rows={rows}>
                <TableHeader />
                <TableBody />
            </Table>
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
                            github_id={this.props.github_id}
                            onInputChange={this.props.handleInputChange}
                            onInputSubmit={this.props.handleInputSubmit} />
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader></CardHeader>
                    <CardBody>
                        <EventsTable
                            error_response={this.props.error_response}
                            typed_github_id={this.props.typed_github_id}
                            history={this.props.history} />
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        github_id: state.github_id,
        typed_github_id: state.typed_github_id,
        history: state.history,
        error_response: state.error_response
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (input_value) => dispatch(
            {
                type: 'INPUT_CHANGE',
                value: input_value
            }),
        handleInputSubmit: (github_id) => dispatch(
            fetchHistoryAction(github_id)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
