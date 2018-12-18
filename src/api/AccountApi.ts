import { Observable } from "rxjs";
import { Address } from "../crypto/Address";
import { DCoreApi } from "../DCoreApi";
import { Account } from "../models/Account";
import { ChainObject } from "../models/ChainObject";
import { ObjectType } from "../models/ObjectType";
import { SearchAccountHistoryOrder } from "../models/order/SearchAccountHistoryOrder";
import { TransactionDetail } from "../models/TransactionDetail";
import { GetAccountById } from "../net/models/request/GetAccountById";
import { GetAccountByName } from "../net/models/request/GetAccountByName";
import { GetKeyReferences } from "../net/models/request/GetKeyReferences";
import { GetStatisticsById } from "../net/models/request/GetStatisticsById";
import { SearchAccountHistory } from "../net/models/request/SearchAccountHistory";
import { BaseApi } from "./BaseApi";

export class AccountApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * get Account object by name
     *
     * @param accountName the name of the account
     * @return an account if found, {@link NotFoundError} otherwise
     */
    public getAccountByName(accountName: string): Observable<Account> {
        return this.request(new GetAccountByName(accountName));
    }

    /**
     * get Account objects by ids
     *
     * @param accountId object ids of the account, 1.2.*
     * @return accounts if found, {@link NotFoundError} otherwise
     */
    public getAccountsByIds(accountId: ChainObject[]): Observable<Account[]> {
        return this.request(new GetAccountById(accountId));
    }

    /**
     * get Account object ids referenced by public keys
     *
     * @param keys public keys
     * @return account ids referencing the public keys, {@link NotFoundError} otherwise
     */
    public getAccountIdsByKey(keys: Address[]): Observable<ChainObject[][]> {
        return this.request(new GetKeyReferences(keys));
    }

    /**
     * search account history
     *
     * @param accountId object id of the account, 1.2.*
     * @param order
     * @param from object id of the history object to start from, use {@link ObjectType.Null.genericId()} to ignore
     * @param limit number of entries, max 100
     */
    public searchAccountHistory(
        accountId: ChainObject,
        order: SearchAccountHistoryOrder = SearchAccountHistoryOrder.TimeDesc,
        from: ChainObject = ObjectType.Null.genericId(),
        limit: number = 100,
    ): Observable<TransactionDetail[]> {
        return this.request(new SearchAccountHistory(accountId, order, from, limit));
    }

    /**
     * get Statistics by object id
     *
     * @param objectId object id of statistics
     * @return object if found, {@link NotFoundError} otherwise
     */
    public getStatisticsById(objectId: ChainObject): Observable<any> {
        return this.request(new GetStatisticsById(objectId));
    }

}
