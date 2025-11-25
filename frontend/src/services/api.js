import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000/api' })


export const login = async (username, password) => {
const res = await API.post('/auth/login', { username, password })
return res.data
}


export const getLessons = async () => {
const res = await API.get('/lessons')
return res.data
}


export const getQuizzes = async () => {
const res = await API.get('/quizzes')
return res.data
}


export const getChallenges = async () => {
const res = await API.get('/challenges')
return res.data
}


export const getBadges = async () => {
const res = await API.get('/badges')
return res.data
}
