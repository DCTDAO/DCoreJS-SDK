import { ChainObject } from "../../../models/ChainObject";
import { NftData, NftDataRaw } from "../../../models/NftData";
import { ObjectType } from "../../../models/ObjectType";
import { RawNft } from "../../../models/RawNft";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class ListNftData extends BaseRequest<Array<NftData<RawNft>>> {

    constructor(nftId: ChainObject) {
        super(
            ApiGroup.Database,
            "list_non_fungible_token_data",
            [nftId.objectId],
            (value: NftDataRaw[]) => value.map((it) =>
                new NftData(ChainObject.parse(it.id), ChainObject.parse(it.nft_id), ChainObject.parse(it.owner), new RawNft(it.data))),
        );

        assertThrow(nftId.objectType === ObjectType.Nft, () => "not a valid nft object id");
    }
}
