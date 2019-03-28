import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as WebSocket from "isomorphic-ws";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { DCoreApi } from "../../src/DCoreApi";
import { DCoreSdk } from "../../src/DCoreSdk";
import { Asset, ChainObject, RealSupply } from "../../src/models";
import { AssetData } from "../../src/models/AssetData";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

{
    ([
        ["RPC", DCoreSdk.createForHttp({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false })],
        ["WebSocket", DCoreSdk.createForWebSocket(() => new WebSocket(Helpers.STAGE_WS))],
    ] as Array<[string, DCoreApi]>).forEach(([name, sdk]) => {
        const api = sdk.assetApi;

        describe(`asset API test suite for ${name}`, () => {
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

            it("should return assets", (done: (arg?: any) => void) => {
                api.getAll([ChainObject.parse("1.3.54")])
                    .subscribe((value) => value.should.include.one.instanceOf(Asset), (error) => done(error), () => done());
            });

            it("should get real supply", (done: (arg?: any) => void) => {
                api.getRealSupply()
                    .subscribe((value) => value.should.be.instanceOf(RealSupply), (error) => done(error), () => done());
            });

            it("should list 20 assets after letter c", (done: (arg?: any) => void) => {
                api.listAllRelative("C", 20)
                    .subscribe((value) => value[0].symbol.should.match(/^C.*/) && value.length.should.eq(20), (error) => done(error), () => done());
            });

            it("should return assets by name lookup", (done: (arg?: any) => void) => {
                api.getAllByName(["ALXT", "ALAT"])
                    .subscribe((value) => value.should.all.be.instanceOf(Asset), (error) => done(error), () => done());
            });

            it("should return asset data", (done: (arg?: any) => void) => {
                api.getAssetsData([ChainObject.parse("2.3.0")])
                    .subscribe((value) => value.should.all.be.instanceOf(AssetData), (error) => done(error), () => done());
            });

        });
    });
}
