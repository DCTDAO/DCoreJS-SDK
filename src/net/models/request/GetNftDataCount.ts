import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

// @UInt64, capped by max instance id so number is safe
export class GetNftDataCount extends BaseRequest<number> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_non_fungible_token_data_count",
            [],
        );
    }
}
