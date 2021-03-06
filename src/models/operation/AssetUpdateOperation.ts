import { Expose, Type } from "class-transformer";
import * as Long from "long";
import { Fee } from "../../DCoreClient";
import { DCoreConstants } from "../../DCoreConstants";
import { ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain } from "../../net/adapter/TypeAdapters";
import { assertThrow } from "../../utils/Utils";
import { ChainObject } from "../ChainObject";
import { ExchangeRate } from "../ExchangeRate";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class AssetUpdateOperation extends BaseOperation {

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "issuer" })
    public issuer: ChainObject;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "asset_to_update" })
    public assetToUpdate: ChainObject;

    @Expose({ name: "new_description" })
    public newDescription: string;

    @ChainObjectToPlain
    @ChainObjectToClass
    @Expose({ name: "new_issuer" })
    public newIssuer?: ChainObject;

    // UInt64
    @LongToClass
    @LongToPlain
    @Expose({ name: "max_supply" })
    public maxSupply: Long;

    @Type(() => ExchangeRate)
    @Expose({ name: "core_exchange_rate" })
    public coreExchangeRate: ExchangeRate;

    @Expose({ name: "is_exchangeable" })
    public exchangeable: boolean;

    /**
     * Update asset operation constructor.
     *
     * @param issuer account id issuing the asset
     * @param assetToUpdate asset to update
     * @param coreExchangeRate new exchange rate
     * @param newDescription new description
     * @param exchangeable enable converting the asset to DCT, so it can be used to pay for fees
     * @param maxSupply new max supply
     * @param newIssuer a new issuer account id
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(
        issuer: ChainObject,
        assetToUpdate: ChainObject,
        coreExchangeRate: ExchangeRate,
        newDescription: string,
        exchangeable: boolean,
        maxSupply: Long,
        newIssuer?: ChainObject,
        fee?: Fee,
    ) {
        super(OperationType.UpdateUserIssuedAsset, fee);
        this.issuer = issuer;
        this.assetToUpdate = assetToUpdate;
        this.newDescription = newDescription;
        this.newIssuer = newIssuer;
        this.maxSupply = maxSupply;
        this.coreExchangeRate = coreExchangeRate;
        this.exchangeable = exchangeable;

        assertThrow(maxSupply ? maxSupply <= DCoreConstants.MAX_SHARE_SUPPLY : true, () => "max supply max value overflow");
        assertThrow(newDescription ? newDescription.length <= 1000 : true, () => "description cannot be longer then 1000 chars");
    }
}
