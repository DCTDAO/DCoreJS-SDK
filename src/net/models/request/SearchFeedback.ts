import { plainToClass } from "class-transformer";
import { ChainObject } from "../../../models/ChainObject";
import { ObjectType } from "../../../models/ObjectType";
import { Purchase } from "../../../models/Purchase";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class SearchFeedback extends BaseRequest<Purchase[]> {

    constructor(
        uri: string,
        user?: string,
        startId: ChainObject = ObjectType.Null.genericId(),
        count: number = 100,
    ) {
        super(
            ApiGroup.Database,
            "search_feedback",
            [user, uri, startId.objectId, count],
            (value: object[]) => plainToClass(Purchase, value),
        );
    }
}
