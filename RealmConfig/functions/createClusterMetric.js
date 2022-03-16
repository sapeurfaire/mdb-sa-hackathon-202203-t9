exports = function() {
  SCHEME = "https";
  DATA_API_HOSTNAME_PATH = 'data.mongodb-api.com/app/data-qyves/endpoint/data/beta/action/insertOne';
  //ATLAS_API_HOSTNAME_PATH = `cloud.mongodb.com/api/atlas/v1.0/groups/${context.values.get("AtlasGroupId")}/processes`;
  
  return context.http
    .post({
      //"url": `${SCHEME}://${context.values.get("AtlasAPIKeyPublic")}:${context.values.get("AtlasAPIKeyPrivate")}@${ATLAS_API_HOSTNAME_PATH}`,
      "url": `${SCHEME}://${DATA_API_HOSTNAME_PATH}`,
      "body": context.http.body,
      encodeBodyAsJSON: true,
      "headers": {
        'Content-Type': ['application/json'],
        'Access-Control-Request-Headers': ['*'],
        'api-key': ['EUUfqrDqmzTBgEWsfHWbOxm0KH8TgUsyFC1Rvy8T9mnQArhfWefAR3DRSvhYyE']
      }
    })
    .then(response => {
      const ejson_body = EJSON.parse(response.body.text());
      return ejson_body;
    });
};