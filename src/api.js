import axios from 'axios'

function fetchHistory(github_id) {
    const url = 'https://api.github.com/users/' + github_id + '/events';
    return axios.get(url)
}

export {
    fetchHistory
}
