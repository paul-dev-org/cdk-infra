import { Duration, Stack, type StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  type Conditions,
  ManagedPolicy,
  OpenIdConnectProvider,
  Role,
  WebIdentityPrincipal,
} from "aws-cdk-lib/aws-iam";

export type GithubOidcProps = StackProps & {
  repositoryConfig: {
    owner: string;
    repo: string;
    filter?: string;
  }[];
};

export class GithubOidcStack extends Stack {
  constructor(scope: Construct, id: string, props: GithubOidcProps) {
    super(scope, id, props);

    const githubDomain = "token.actions.githubusercontent.com";

    const githubProvider = new OpenIdConnectProvider(
      this,
      "GithubActionsProvider",
      {
        url: `https://${githubDomain}`,
        clientIds: ["sts.amazonaws.com"],
      },
    );

    const iamRepoDeployAccess = props.repositoryConfig.map(
      (r) => `repo:${r.owner}/${r.repo}:${r.filter ?? "*"}`,
    );

    const conditions: Conditions = {
      StringLike: {
        [`${githubDomain}:sub`]: iamRepoDeployAccess,
      },
    };

    const policies = [
      ManagedPolicy.fromAwsManagedPolicyName(
        "AmazonEC2ContainerRegistryPowerUser",
      ),
      ManagedPolicy.fromAwsManagedPolicyName("AmazonECS_FullAccess"),
    ];

    new Role(this, "gitHubDeployRole", {
      assumedBy: new WebIdentityPrincipal(
        githubProvider.openIdConnectProviderArn,
        conditions,
      ),
      managedPolicies: policies,
      roleName: "githubActionsDeployRole",
      description: "This role is used via GitHub Actions",
      maxSessionDuration: Duration.hours(1),
    });
  }
}
