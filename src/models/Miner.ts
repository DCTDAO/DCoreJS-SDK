import { Expose } from "class-transformer";
import * as Long from "long";
import { Address } from "../crypto/Address";
import { AddressToClass, ChainObjectToClass } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class Miner {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @ChainObjectToClass
    @Expose({ name: "miner_account" })
    public minerAccount: ChainObject;

    @Expose({ name: "last_aslot" })
    public lastAslot: number;

    @AddressToClass
    @Expose({ name: "signing_key" })
    public signingKey: Address;

    @ChainObjectToClass
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
    public lastConfirmedBlockNum: Long;
}
