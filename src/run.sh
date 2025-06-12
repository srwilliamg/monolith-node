#!/bin/bash
yum install -y aws-cfn-bootstrap
curl -sL https://rpm.nodesource.com/setup_22.x | bash -
yum install -y nodejs
mkdir -p /home/ec2-user/app

for i in {1..5}; do
    aws s3 cp s3://$APP_BUCKET/server.js /home/ec2-user/app/server.js && break
    sleep 5
done
if [ -f /home/ec2-user/app/server.js ]; then
    pkill -f "node /home/ec2-user/app/server.js" || true
    nohup node /home/ec2-user/app/server.js >/home/ec2-user/app/server.log 2>&1 &
    /opt/aws/bin/cfn-signal -e 0 --stack $STACK_NAME --resource MonolithAppInstance --region $AWS_REGION
else
    /opt/aws/bin/cfn-signal -e 1 --stack $STACK_NAME --resource MonolithAppInstance --region $AWS_REGION
fi
