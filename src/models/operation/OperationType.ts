export enum OperationType {
    Transfer = 0,
    AccountCreate,
    AccountUpdate,
    AssetCreate,
    AssetIssue,
    AssetPublishFeed,
    MinerCreate,
    MinerUpdate,
    MinerUpdateGlobalParameters,
    ProposalCreate,
    ProposalUpdagte,
    ProposalDelete,
    WithdrawPermissionCreate,
    WithdrawPermissionUpdate,
    WithdrawPermissionClaim,
    WithdrawPermissionDelete,
    VestingBalanceCreate,
    VestingBalanceWithdraw,
    Custom,
    Assert,
    ContentSubmit,
    RequestToBuy,
    LeaveRatingAndComment,
    ReadyToPublish,
    ProofOfCustody,
    DeliverKeys,
    Subscribe,
    SubscribeByAuthor,
    AutomaticRenewalOfSubscription,
    ReportStats,
    SetPublishingManager,
    SetPublishingRight,
    ContentCancellation,
    AssetFundPools,
    AssetReserve,
    AssetClaimFees,
    UpdateUserIssuedAsset,
    UpdateMonitoredAsset,
    ReadyToPublishTwo,
    Transfer2,
    DisallowAutomaticRenewalOfSubscription, // VIRTUAL
    ReturnEscrowSubsmission, // VIRTUAL
    ReturnEscrowBuying, // VIRTUAL
    PaySeeder, // VIRTUAL
    FinishBuying, // VIRTUAL
    RenewalOfSubscription, // VIRTUAL
    Unknown,
}
