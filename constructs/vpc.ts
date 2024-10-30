import { Construct } from "constructs";
import { Vpc } from "aws-cdk-lib/aws-ec2";

export type AwsVpcProps = {
  cidr?: string;
  noOfAzs?: number;
  createInternetGateway?: boolean;
  createNatGateway?: boolean;
  noOfNatGateways?: number;
  stage?: string;
};

export class AwsVpc extends Construct {
  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string, props: AwsVpcProps) {
    super(scope, id);
    this.vpc = new Vpc(this, `${props.stage}Vpc`, {
      cidr: props.cidr || undefined,
      maxAzs: props.noOfAzs || 3,
      natGateways: props.createNatGateway ? props.noOfNatGateways : 1,
    });
  }
}
