import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as _ from "lodash";
import "mocha";
import { duration } from "moment";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreClient } from "../src/DCoreClient";
import { AssetAmount } from "../src/models/AssetAmount";
import { ChainObject } from "../src/models/ChainObject";
import { TransferOperation } from "../src/models/operation/TransferOperation";
import { Helpers } from "./Helpers";

chai.should();
chai.use(chaiThings);

Helpers.APIS.forEach(([name, api]) => {
    const sdk = _.get(api, "core") as DCoreClient;

    describe(`dcore SDK test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            spy = create();
            // spy.log(/^API\w+/);
        });

        after(() => {
            sdk.disconnect();
            spy.teardown();
        });

        it("should prepare transaction with multiple ops with different fees", (done: (arg?: any) => void) => {
            const ops = [
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(1)),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(2)),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(3)),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(4), undefined, ChainObject.parse("1.3.33")),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(5), undefined, ChainObject.parse("1.3.33")),
                new TransferOperation(Helpers.ACCOUNT, Helpers.ACCOUNT2, new AssetAmount(6), undefined, ChainObject.parse("1.3.33")),
            ];

            sdk.prepareTransaction(ops, duration(30, "seconds"))
                .subscribe((value) => value.operations.every((o) => !_.isNil(o.fee)).should.be.true, (error) => done(error), () => done());
        });

    });
});
