import { Construct } from "constructs";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { ApplicationLoadBalancer } from "aws-cdk-lib/aws-elasticloadbalancingv2";

export type AwsAlbProps = {
  vpc: Vpc;
};

export class AwsAppLoadBalancer extends Construct {
  public readonly lb: ApplicationLoadBalancer;

  constructor(scope: Construct, id: string, props: AwsAlbProps) {
    super(scope, id);

    this.lb = new ApplicationLoadBalancer(this, "Alb", {
      vpc: props.vpc,
      internetFacing: true,
    });
  }
}
