const AWS = require('aws-sdk');
const { sendResponse } = require('../functions');

module.exports.listener = async (event) => {
    console.log('event bridge works');
    return sendResponse(200, { message: `event bridge works` });
};

module.exports.trigger = async (event) => {
    const eventBridge = new AWS.EventBridge();
    const eventResult = await eventBridge.putEvents({
        Entries: [
            {
                EventBusName: 'application-bridge',
                Source: 'custom.event',
                DetailType: 'MyEvent',
                Detail: event.body,
            },
        ]
    }).promise();

    return sendResponse(200, { message: `Email ${event.requestContext.authorizer.claims.email} has been authorized. Event was triggered` });
};