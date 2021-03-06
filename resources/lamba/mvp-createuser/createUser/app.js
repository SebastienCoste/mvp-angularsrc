const AWS = require('aws-sdk')

AWS.config.update({ region: "eu-central-1" });

let response;

/**
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * @param {Object} context
 *
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });

    const params = {
      TableName: "mvpusers",
      Item: {
        date: Date.now(),
        contact: "Richard Dawkins",
        restaurantname: "Brilliant Burritos",
        notables: 15
      }
    }
  
    try {

      const data = await documentClient.put(params).promise();
   
      response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'New user created successfully...',
        })
      }

      return response

    } catch (err) {

      response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'There was an error creating new user...',
        })
      }

      return response

    }

};

