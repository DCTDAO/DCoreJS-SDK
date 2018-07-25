import * as chai from "chai";
import * as chaiThings from "chai-things";
import "chai/register-should";
import WebSocket = require("isomorphic-ws");
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import * as wtf from "wtfnode";
import { Address } from "../../../src/crypto/Address";
import { Account } from "../../../src/models/Account";
import { AccountNameId } from "../../../src/models/AccountNameId";
import { Asset } from "../../../src/models/Asset";
import { AssetAmount } from "../../../src/models/AssetAmount";
import { ChainObject } from "../../../src/models/ChainObject";
import { Content } from "../../../src/models/Content";
import { DynamicGlobalProperties } from "../../../src/models/DynamicGlobalProperties";
import { Miner } from "../../../src/models/Miner";
import { EmptyOperation } from "../../../src/models/operation/EmptyOperation";
import { OperationHistory } from "../../../src/models/OperationHistory";
import { OperationType } from "../../../src/models/OperationType";
import { ProcessedTransaction } from "../../../src/models/ProcessedTransaction";
import { Purchase } from "../../../src/models/Purchase";
import { TransactionDetail } from "../../../src/models/TransactionDetail";
import { ApiGroup } from "../../../src/net/models/ApiGroup";
import { GetAccountBalances } from "../../../src/net/models/request/GetAccountBalances";
import { GetAccountById } from "../../../src/net/models/request/GetAccountById";
import { GetAccountByName } from "../../../src/net/models/request/GetAccountByName";
import { GetAccountHistory } from "../../../src/net/models/request/GetAccountHistory";
import { GetAssets } from "../../../src/net/models/request/GetAssets";
import { GetBuyingByUri } from "../../../src/net/models/request/GetBuyingByUri";
import { GetChainId } from "../../../src/net/models/request/GetChainId";
import { GetContentById } from "../../../src/net/models/request/GetContentById";
import { GetContentByUri } from "../../../src/net/models/request/GetContentByUri";
import { GetDynamicGlobalProps } from "../../../src/net/models/request/GetDynamicGlobalProps";
import { GetKeyReferences } from "../../../src/net/models/request/GetKeyReferences";
import { GetMiners } from "../../../src/net/models/request/GetMiners";
import { GetRecentTransactionById } from "../../../src/net/models/request/GetRecentTransactionById";
import { GetRequiredFees } from "../../../src/net/models/request/GetRequiredFees";
import { GetTransaction } from "../../../src/net/models/request/GetTransaction";
import { Login } from "../../../src/net/models/request/Login";
import { LookupAccounts } from "../../../src/net/models/request/LookupAccounts";
import { LookupAssetSymbols } from "../../../src/net/models/request/LookupAssetSymbols";
import { LookupMiners } from "../../../src/net/models/request/LookupMiners";
import { RequestApiAccess } from "../../../src/net/models/request/RequestApiAccess";
import { SearchAccountHistory } from "../../../src/net/models/request/SearchAccountHistory";
import { SearchBuyings } from "../../../src/net/models/request/SearchBuyings";
import { RxWebSocket } from "../../../src/net/ws/RxWebSocket";

chai.should();
chai.use(chaiThings);

describe("websocket requests", function() {
    let rxWs: RxWebSocket;
    let spy: Spy;

    this.timeout(15000);

    beforeEach(() => {
        spy = create();
        spy.log(/^RxWebSocket_make_\w+/);
        rxWs = new RxWebSocket(
            "wss://stagesocket.decentgo.com:8090",
            (url, protocols) => new WebSocket(url, protocols, { rejectUnauthorized: false }),
        );
    });

    afterEach(() => {
        rxWs.close();
        spy.teardown();
    });

    after(() => wtf.dump());

    it("should return asset balances for the account", (done) => {
        rxWs.request(new GetAccountBalances(ChainObject.parse("1.2.35")))
            .subscribe((value) => value.should.all.be.instanceOf(AssetAmount), (error) => done(error), () => done());
    });

    it("should return account by id", (done) => {
        rxWs.request(new GetAccountById(ChainObject.parse("1.2.35")))
            .subscribe((value) => value.should.include.one.instanceOf(Account), (error) => done(error), () => done());
    });

    it("should return account by name", (done) => {
        rxWs.request(new GetAccountByName("u3a7b78084e7d3956442d5a4d439dad51"))
            .subscribe((value) => value.should.be.instanceOf(Account), (error) => done(error), () => done());
    });

    it("should return account history by name", (done) => {
        rxWs.request(new GetAccountHistory(ChainObject.parse("1.2.35"), ChainObject.parse("1.7.35")))
            .subscribe((value) => value.should.all.instanceOf(OperationHistory), (error) => done(error), () => done());
    });

    it("should return assets", (done) => {
        rxWs.request(new GetAssets([ChainObject.parse("1.3.54")]))
            .subscribe((value) => value.should.include.one.instanceOf(Asset), (error) => done(error), () => done());
    });

    it("should return purchase by URI", (done) => {
        rxWs.request(new GetBuyingByUri(ChainObject.parse("1.2.35"), "http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca"))
            .subscribe((value) => value.should.be.instanceOf(Purchase), (error) => done(error), () => done());
    });

    it("should return chain id", (done) => {
        rxWs.request(new GetChainId())
            .subscribe((value) => value.should.be.a("string"), (error) => done(error), () => done());
    });

    it("should return content by id", (done) => {
        rxWs.request(new GetContentById(ChainObject.parse("2.13.74")))
            .subscribe((value) => value.should.include.one.instanceOf(Content), (error) => done(error), () => done());
    });

    it("should return content by URI", (done) => {
        rxWs.request(new GetContentByUri("http://alax.io/?scheme=alax%3A%2F%2F1%2F1&version=b711dc9b-3627-4f37-93f3-6f6f3137bcca"))
            .subscribe((value) => value.should.instanceOf(Content), (error) => done(error), () => done());
    });

    it("should return dynamic global properties", (done) => {
        rxWs.request(new GetDynamicGlobalProps())
            .subscribe((value) => value.should.be.instanceOf(DynamicGlobalProperties), (error) => done(error), () => done());
    });

    it("should return account for key references", (done) => {
        rxWs.request(new GetKeyReferences([new Address("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz")]))
            .subscribe((value) => value.should.include.one.include.one.instanceOf(ChainObject), (error) => done(error), () => done());
    });

    it("should return miner accounts", (done) => {
        rxWs.request(new GetMiners([ChainObject.parse("1.4.1")]))
            .subscribe((value) => value.should.include.one.instanceOf(Miner), (error) => done(error), () => done());
    });

    // will not work since the transaction is already removed from recent pool
    it("should return recent transaction", (done) => {
        rxWs.request(new GetRecentTransactionById("95914695085f08b84218e39cdea6f910f380e469"))
            .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
    });

    it("should return required fees for operation type", (done) => {
        rxWs.request(new GetRequiredFees([new EmptyOperation(OperationType.Transfer)]))
            .subscribe((value) => value.should.include.one.instanceOf(AssetAmount), (error) => done(error), () => done());
    });

    it("should return transaction", (done) => {
        rxWs.request(new GetTransaction(1370282, 0))
            .subscribe((value) => value.should.be.instanceOf(ProcessedTransaction), (error) => done(error), () => done());
    });

    it("should login", (done) => {
        rxWs.request(new Login())
            .subscribe((value) => value.should.be.true, (error) => done(error), () => done());
    });

    it("should return accounts by name lookup", (done) => {
        rxWs.request(new LookupAccounts("alx-customer"))
            .subscribe((value) => value.should.all.be.instanceOf(AccountNameId), (error) => done(error), () => done());
    });

    it("should return assets by name lookup", (done) => {
        rxWs.request(new LookupAssetSymbols(["ALXT", "ALAT"]))
            .subscribe((value) => value.should.all.be.instanceOf(Asset), (error) => done(error), () => done());
    });

    it("should return miners by name lookup", (done) => {
        rxWs.request(new LookupMiners(""))
            .subscribe((value) => value.should.all.be.instanceOf(AccountNameId), (error) => done(error), () => done());
    });

    it("should request api access", (done) => {
        rxWs.request(new RequestApiAccess(ApiGroup.Database))
            .subscribe((value) => value.should.be.a("number"), (error) => done(error), () => done());
    });

    it("should return history by search", (done) => {
        rxWs.request(new SearchAccountHistory(ChainObject.parse("1.2.35")))
            .subscribe((value) => value.should.all.be.instanceOf(TransactionDetail), (error) => done(error), () => done());
    });

    it("should return purchases by search", (done) => {
        rxWs.request(new SearchBuyings(ChainObject.parse("1.2.35"), ""))
            .subscribe((value) => value.should.all.be.instanceOf(Purchase), (error) => done(error), () => done());
    });

});
