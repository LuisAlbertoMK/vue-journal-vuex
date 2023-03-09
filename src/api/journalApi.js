import axios from 'axios'

const journalApi = axios.create({
    baseURL :'https://vue-demos-19c96-default-rtdb.firebaseio.com'
})

export default journalApi