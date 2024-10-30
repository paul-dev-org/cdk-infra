import { Construct } from "constructs";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Cluster } from "aws-cdk-lib/aws-ecs";

export type AwsClusterProps = {
  vpc: Vpc;
};

export class EcsCluster extends Construct {
  public readonly cluster: Cluster;

  constructor(scope: Construct, id: string, props: AwsClusterProps) {
    super(scope, id);
    this.cluster = new Cluster(this, "EcsCluster", {
      vpc: props.vpc,
    });
  }
}
