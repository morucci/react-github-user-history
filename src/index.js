import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// Not so sure about the patternfly version I'm using the 3 or the 4 ?
// following https://github.com/patternfly/patternfly-react/blob/master/packages/patternfly-4/react-core/README.md
// and https://patternfly-react.surge.sh/patternfly-4/components/checkbox
import '@patternfly/react-core/dist/styles/base.css';
import { Form, FormGroup, ActionGroup, TextInput, Button} from '@patternfly/react-core';

class Event extends React.Component {
    render() {
        return (
            <li>
                Event: ID: {this.props.event.id},
                Type: {this.props.event.type},
                Repo: {this.props.event.repo.name}
            </li>
        );
    }
}

class ListEvents extends React.Component {
    render() {
        return (
            <div>
                <h2>GitHub ID: {this.props.github_id}</h2>
                <ul>
                    {this.props.history.map(
                        (event) => <Event
                            key={event.id}
                            event={event} />)
                    }
                </ul>
            </div>
        );
    }
}

class SelectIdForm extends React.Component {
    handleChange = (value) => {
        console.log("On change: " + value);
        this.props.onInputChange(value);
    }

    handleSubmit = (event) => {
        console.log("On submit: " + event);
        this.props.onInputSubmit(event);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
            <FormGroup
                label="Required GitHub username"
                isRequired
                helperText="Please provide the GitHub username"
            >
                <TextInput
                    type="text"
                    onChange={this.handleChange} />
            </FormGroup>
            <ActionGroup>
                <Button>Submit</Button>
            </ActionGroup>
            </Form>
        );
    }
}

class GitHubUserHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typed_github_id: null,
            github_id: null,
            history: []
        };
    }

    handleInputChange = (input_value) => {
        const value = input_value;
        this.setState(
            (prev_state, props) => ({ typed_github_id: value }));
    }

    handleInputSubmit = (event) => {
        const submitted = this.state.typed_github_id
        this.setState(
            (state, props) => {
                // As setState is async I need to trigger fetchHistory here
                // or outside the setState but by passing submitted.
                // Not sure that the right way ?
                this.fetchHistory(submitted);
                return { github_id: submitted }
            });
        event.preventDefault();
    }

    fetchHistory = (github_id) => {
        console.log('Fetching history for ' + github_id);
        axios.get(
            'https://api.github.com/users/' + github_id + '/events')
            .then(res => {
                const history = res.data;
                this.setState((state, props) => ({ history: history }));
            })
    }

    render() {
        return (
            <div className="history">
                <h1>View 90 days history of a GitHub user</h1>
                <SelectIdForm
                    onInputChange={this.handleInputChange}
                    onInputSubmit={this.handleInputSubmit} />
                <ListEvents
                    github_id={this.state.github_id}
                    history={this.state.history} />
            </div>
        );
    }
}

ReactDOM.render(
    <GitHubUserHistory />,
    document.getElementById('root'));

