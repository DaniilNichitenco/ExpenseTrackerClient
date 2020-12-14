import Topic from '../../Data/Models/Topics/Topic';
import TopicForCreate from '../../Data/Models/Topics/TopicForCreate';
import TopicForUpdate from '../../Data/Models/Topics/TopicForUpdate';
import TopicWithExpenses from '../../Data/Models/Topics/TopicWithExpenses';
import API from '../Api';

export const getTopicsWithExpenses = async (limit: number) => {

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

export const getTopics = async () => {

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

export const deleteTopic = async (id: number) => await API.delete("Topics/" + id);

export const createTopic = async (topic: TopicForCreate) => {

    return API.post("/Topics", topic)
        .then(response => {
            
            return{
                response: response,
                data: response.data
            };
        })
        .catch(error => {
            console.log(error);

            return{
                response: error.response,
                data: error.response.data
            };
        });
}

export const getTopic = async (id: number) => {

    return API.get("/Topics/" + id)
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
        });
}

export const updateTopic = async (topic: TopicForUpdate) => {

    return API.put("/Topics", topic)
        .then(response => {
                
            return{
                response: response,
                data: response.data
            };
        })
        .catch(error => {
            console.log(error);

            return{
                response: error.response,
                data: error.response.data
            };
        });
}

export const getMaxUserTopics = async () => {

    return API.get("/Topics/maxUserTopics")
        .then(response => {

            return{
                response: response,
                data: response.data
            }
        })
        .catch(error => {
            console.log(error);

            return{
                response: error,
                data: error.data
            }
        });
}

export const getUserTopicsAmount = async () => {
    return API.get("Topics/amountTopics")
        .then(response => {

            return{
                response: response,
                data: response.data
            }
        })
        .catch(error => {
            
            return{
                response: error,
                data: error.data
            }
        });
}

export const getTopicsForList = async () => {
    return API.get("Topics/userTopicsForList")
        .then(response => {

            return{
                response: response,
                data: response.data
            };
        })
        .catch(error => {
            console.log(error);
            
            return{
                response: error,
                data: error.data
            }
        });
}

export default {
    getTopicsWithExpenses,
    getTopics,
    getTopic,
    deleteTopic,
    createTopic,
    getTopicsForList,
    getUserTopicsAmount,
    getMaxUserTopics,
    updateTopic
}