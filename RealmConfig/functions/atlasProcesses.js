exports = function() {
  SCHEME = "https";
  ATLAS_API_HOSTNAME_PATH = `cloud.mongodb.com/api/atlas/v1.0/groups/${context.values.get("AtlasGroupId")}/processes`;
  
  return context.http
    .get({
      "url": `${SCHEME}://${context.values.get("AtlasAPIKeyPublic")}:${context.values.get("AtlasAPIKeyPrivate")}@${ATLAS_API_HOSTNAME_PATH}`,
      "digestAuth": true
    })
    .then(response => {
      const ejson_body = EJSON.parse(response.body.text());
      return ejson_body;
    });
};