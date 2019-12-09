const TagoUtils = require('tago/utils');
const TagoAccount = require('tago/account');
const Analysis = require('tago/analysis');

/*
** Analysis Example
** Get Device List
**
 * Snippet to push data to MQTT. Follow this pattern within your application
 * If you want more details about MQTT, search "MQTT" in TagoIO help center.
 * You can find plenty of documentation about this topic.
 * TagoIO Team.
**
** How to use?
** In order to trigger this analysis you must setup a Dashboard.
** Create a Widget "Form" and enter the variable 'push_payload' for the device you want to push with the MQTT.
** In User Control, select this Analysis in the Analysis Option.
** Save and use the form.
* */

async function mqttPushExample(context, scope) {
  if (!scope.length) return context.log('This analysis must be triggered by a dashboard.');

  const myData = scope.find(x => x.variable === 'push_payload') || scope[0];
  if (!myData) return context.log('Couldnt find any variable in the scope.');
   
  // Create your data object to push to MQTT
  // In this case we're sending a JSON object.
  // You can send anything you want.
  // Example:
  // const myDataObject = 'This is a string';
  const myDataObject = {
    variable: 'temperature_celsius',
    value: (myData.value - 32) * (5 / 9),
    unit: 'C',
  };

  // Create a object with the options you choosed
  const options = {
    retain: false,
    qos: 0,
  };

  // Publishing to MQTT
  const MQTT = new Services(context.token).MQTT;
  await MQTT.publish('tago/my_topic', JSON.stringify(myDataObject), myData.bucket, options).catch(context.log);
}

module.exports = new Analysis(listDevicesByTag, 'ANALYSIS TOKEN HERE');
