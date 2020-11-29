import Topic from '../../Data/Models/Topics/Topic';
import TopicWithExpenses from '../../Data/Models/Topics/TopicWithExpenses';
import API from '../Api';

export const GetTopicsWithExpenses = async (limit: number) => {

    return API.get("/Topics/topicsWithFixedExpenses/" + limit)
        .then(response => {
            const topics:TopicWithExpenses[] = response.data;
            return {
                response: response,
                data: topics
            }
        })
        .catch(error => {
            console.log(error);

            return {
                response: error.response,
                data: error.response.data
            }
        })
}

export const GetTopics = async () => {

    return API.get("/Topics")
        .then(response => {
            console.log(response);
            const topics:Topic[] = response.data;

            return {
                response: response,
                data: topics
            }
        })
        .catch(error => {
            console.log(error);

            return {
                response: error.response,
                data: error.response.data
            }
        })
}

export const GetTopic = async (id: number) => {

    return API.get("/Topic/" + id)
        .then(response => {
            console.log(response);
            const topic:Topic = response.data;

            return {
                response: response,
                data: topic
            }
        })
        .catch(error => {
            console.log(error);

            return {
                response: error.response,
                data: error.response.data
            }
        })
}

export default {
    GetTopicsWithExpenses,
    GetTopics,
    GetTopic
}