import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { ObjectType } from "../models/ObjectType";
import { OperationHistory } from "../models/OperationHistory";
import { GetAccountHistory } from "../net/models/request/GetAccountHistory";
import { GetRelativeAccountHistory } from "../net/models/request/GetRelativeAccountHistory";
import { BaseApi } from "./BaseApi";

export class HistoryApi extends BaseApi {
    constructor(api: DCoreApi) {
        super(api);
    }

    public getAccountHistory(
        accountId: ChainObject,
        startId: ChainObject = ObjectType.OperationHistory.genericId(),
        stopId: ChainObject = ObjectType.OperationHistory.genericId(),
        limit: number = 100,
    ): Observable<OperationHistory[]> {
        return this.request(new GetAccountHistory(accountId, stopId, limit, startId));
    }

    public getRelativeAccountHistory(
        accountId: ChainObject,
        startId: number = 0,
        stopId: number = 0,
        limit: number = 100,
    ): Observable<OperationHistory[]> {
        return this.request(new GetRelativeAccountHistory(accountId, stopId, limit, startId));
    }

}
