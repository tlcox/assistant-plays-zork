// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const axios = require('axios');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  
    function startGame(agent) {
    
        return axios.get('http://35.231.76.27:8000/startGame')
            .then((response) => {
                let message = response.data.message;
                console.log(`message: ${message}`);
                agent.add(message);
                return Promise.resolve(message);
            }).catch((err) =>{
                return Promise.reject(err);
            });
    }
  
 
    function fallback(agent) {
      return axios.post('http://35.231.76.27:8000/', {cmd: request.body.queryResult.queryText})
        .then((response) => {
            let message = response.data.message;
            console.log(`message: ${message}`);
            agent.add(message);
            return Promise.resolve(message);
        }).catch((err) =>{
            return Promise.reject(err);
        });
    }
    
    function repeat(agent) {
        return axios.get('http://35.231.76.27:8000/')
            .then((response) => {
                let message = response.data.message;
                console.log(`message: ${message}`);
                agent.add(message);
                return Promise.resolve(message);
            }).catch((err) =>{
                return Promise.reject(err);
            });
    }
    
    function end(agent) {
        return axios.get('http://35.231.76.27:8000/end')
            .then((response) => {
                let message = response.data.message;
                console.log(`message: ${message}`);
                agent.add(message);
                return Promise.resolve(message);
            }).catch((err) =>{
                return Promise.reject(err);
            });
    }


    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', startGame);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('repeat', repeat);
    intentMap.set('finish', end);
    agent.handleRequest(intentMap);
});


