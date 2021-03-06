import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { Purchase } from "../../../models/Purchase";
import { assertThrow } from "../../../utils/Utils";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetOpenBuyingsByConsumer extends BaseRequest<Purchase[]> {
    constructor(consumer: ChainObject) {
        super(
            ApiGroup.Database,
            "get_open_buyings_by_consumer",
            [consumer.objectId],
            (value: object[]) => plainToClass(Purchase, value),
        );

        assertThrow(consumer.objectType === ObjectType.Account, () => "not a valid account object id");
    }
}
