import { Expose, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { ChainObject } from "./ChainObject";

export class Miner {
    @Type(() => ChainObject)
    @Expose({ name: "id" })
    public id: ChainObject;

    @Type(() => ChainObject)
    @Expose({ name: "miner_account" })
    public minerAccount: ChainObject;

    @Expose({ name: "last_aslot" })
    public lastAslot: number;

    @Type(() => Address)
    @Expose({ name: "signing_key" })
    public signingKey: Address;

    @Type(() => ChainObject)
    @Expose({ name: "pay_vb" })
    public payVb: ChainObject;

    @Expose({ name: "vote_id" })
    public voteId: string;

    @Expose({ name: "total_votes" })
    public totalVotes: number;

    @Expose({ name: "url" })
    public url: string;

    @Expose({ name: "total_missed" })
    public totalMissed: number;

    @Expose({ name: "last_confirmed_block_num" })
    public lastConfirmedBlockNum: number;
}
