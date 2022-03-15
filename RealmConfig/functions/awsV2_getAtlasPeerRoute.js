exports = function(arg){

var AWS = require("aws-sdk");

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeRouteTables-property

const ak = context.values.get("awsKey");
const as = context.values.get("awsSecret");

AWS.config.update({
    region: "us-east-2",
    accessKeyId: `${ak}`, 
    secretAccessKey: `${as}`
    });

// Create anAmazon EC2 service client object.
const ec2 = new AWS.EC2({});

const params = {
    // DryRun: true,
    Filters: [{ Name: "route.vpc-peering-connection-id", Values: ["pcx-02a4f3024c9450624"]} ],
    RouteTableId: "rtb-0c6e055c94067cf0e"
    // VpcPeeringConnectionId: 'STRING_VALUE',
    // DestinationCidrBlock: "192.168.240.0/21"
};

ec2.describeRouteTables(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log("Success!", JSON.stringify(data, null, 2));
    });

};