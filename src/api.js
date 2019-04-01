import axios from 'axios'

function fetchHistoryPage(github_id, page) {
    const url = 'https://api.github.com/users/' + github_id +
        '/events' + '?page=' + page;
    return axios.get(url)
}

export {
    fetchHistoryPage
}
