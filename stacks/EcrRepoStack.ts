import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Repository, TagMutability } from "aws-cdk-lib/aws-ecr";

export type EcrStackProps = cdk.StackProps & {
  repositoryName: string;
};

export class EcrStack extends cdk.Stack {
  public readonly repo: Repository;
  constructor(scope: Construct, id: string, props: EcrStackProps) {
    super(scope, id, props);

    this.repo = new Repository(this, props.repositoryName, {
      repositoryName: props.repositoryName,
      imageTagMutability: TagMutability.IMMUTABLE,
    });
  }
}
