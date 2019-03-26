import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { flatMap } from "rxjs/operators";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { AssetAmount } from "../../src/models/AssetAmount";
import { TransferOperation } from "../../src/models/operation/TransferOperation";
import { Helpers } from "../Helpers1";

chai.should();
chai.use(chaiThings);

([
    ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
    ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS, { rejectUnauthorized: false }))],
] as Array<[string, DCoreApi]>).forEach(([name, api]) => {

    describe(`account API test suite for ${name}`, () => {
            after(() => {
                // wtf.dump();
            });

            let spy: Spy;

            before(() => {
                spy = create();
                // this.spy.log(/^API\w+/);
            });

            after(() => {
                api.disconnect();
                spy.teardown();
            });

            it("should create a transfer", (done: (arg?: any) => void) => {
                const op = api.accountApi.createCredentials(Helpers.ACCOUNT_NAME, Helpers.PRIVATE).pipe(flatMap((credentials) =>
                    api.accountApi.createTransfer(credentials, Helpers.ACCOUNT_NAME2, new AssetAmount(1))));

                op.subscribe((value) => value.should.be.instanceOf(TransferOperation), (error) => done(error), () => done());
            });
    });
});
