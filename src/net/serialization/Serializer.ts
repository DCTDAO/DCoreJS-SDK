import * as ByteBuffer from "bytebuffer";
import * as _ from "lodash";
import { AssetAmount } from "../../models/AssetAmount";
import { Authority } from "../../models/Authority";
import { AuthorityMap } from "../../models/AuthorityMap";
import { BlockData } from "../../models/BlockData";
import { ChainObject } from "../../models/ChainObject";
import { Memo } from "../../models/Memo";
import { Options } from "../../models/Options";
import { PubKey } from "../../models/PubKey";
import { Publishing } from "../../models/Publishing";
import { Transaction } from "../../models/Transaction";
import { VoteId } from "../../models/VoteId";
import { BaseUtils } from "../../utils/BaseUtils";

type Adapter<T> = (buffer: ByteBuffer, obj: T) => void;

export class Serializer {

    private adapters: Map<string, Adapter<any>> = new Map();

    constructor() {
        this.adapters.set(ChainObject.name, this.chainIdAdapter);
        this.adapters.set("string", this.stringAdapter);
        this.adapters.set(Authority.name, this.authorityAdapter);
        this.adapters.set(AuthorityMap.name, this.authorityMapAdapter);
        this.adapters.set(AssetAmount.name, this.assetAmountAdapter);
        this.adapters.set(Buffer.name, this.bufferAdapter);
        this.adapters.set(Memo.name, this.memoAdapter);
        this.adapters.set(VoteId.name, this.voteAdapter);
        this.adapters.set("boolean", this.booleanAdapter);
        this.adapters.set(Option.name, this.optionsAdapter);
        this.adapters.set(PubKey.name, this.pubKeyAdapter);
        this.adapters.set(Publishing.name, this.publishingAdapter);
        this.adapters.set(BlockData.name, this.blockDataAdapter);
        this.adapters.set(Transaction.name, this.transactionAdapter);
    }

    public serialize(obj: any): Buffer {
        const buffer = new ByteBuffer(0, true);
        this.append(buffer, obj);
        return buffer.buffer;
    }

    private append(buffer: ByteBuffer, obj: any) {
        if (_.isArray(obj) && obj.length === 0) {
            buffer.writeByte(0);
        } else if (_.isArray(obj)) {
            buffer.writeVarint64(obj.length);
            obj.forEach((value) => this.append(buffer, value));
        } else {
            const key = _.isObject(obj) ? obj.constructor.name : typeof obj;
            this.adapters.get(key)(buffer, obj);
        }
    }

    private chainIdAdapter = (buffer: ByteBuffer, obj: ChainObject) => buffer.writeVarint32(obj.instance);

    private stringAdapter = (buffer: ByteBuffer, obj: string) => {
        buffer.writeVarint32(obj.length);
        buffer.writeUTF8String(obj);
    }

    private authorityAdapter = (buffer: ByteBuffer, obj: Authority) => {
        buffer.writeUint32(obj.weightThreshold);
        this.append(buffer, obj.accountAuths);
        this.append(buffer, obj.keyAuths);
    }

    private authorityMapAdapter = (buffer: ByteBuffer, obj: AuthorityMap) => {
        this.append(buffer, obj.value);
        buffer.writeUint16(obj.weight);
    }

    private assetAmountAdapter = (buffer: ByteBuffer, obj: AssetAmount) => {
        buffer.writeInt64(obj.amount);
        this.append(buffer, obj.assetId);
    }

    private bufferAdapter = (buffer: ByteBuffer, obj: Buffer) => {
        buffer.writeVarint32(obj.length);
        buffer.append(obj);
    }

    private memoAdapter = (buffer: ByteBuffer, obj: Memo) => {
        if (_.isNil(obj.from)) {
            buffer.writeBytes(Buffer.alloc(33, 0));
        } else {
            this.append(buffer, obj.from);
        }
        if (_.isNil(obj.to)) {
            buffer.writeBytes(Buffer.alloc(33, 0));
        } else {
            this.append(buffer, obj.from);
        }
        buffer.writeInt64(obj.nonce);
        this.append(buffer, BaseUtils["16"]().decode(obj.message));
    }

    // tslint:disable-next-line:no-bitwise
    private voteAdapter = (buffer: ByteBuffer, obj: VoteId) => buffer.writeUint32(obj.id << 8 | obj.type);

    private booleanAdapter = (buffer: ByteBuffer, obj: boolean) => buffer.writeByte(obj ? 1 : 0);

    private optionsAdapter = (buffer: ByteBuffer, obj: Options) => {
        this.append(buffer, obj.memoKey);
        this.append(buffer, obj.votingAccount);
        buffer.writeUint16(obj.numMiner);
        this.append(buffer, obj.votes);
        this.append(buffer, obj.extensions);
        this.append(buffer, obj.allowSubscription);
        this.append(buffer, obj.pricePerSubscribe);
        buffer.writeUint32(obj.subscriptionPeriod);
    }

    private pubKeyAdapter = (buffer: ByteBuffer, obj: PubKey) => this.append(buffer, obj.key);

    private publishingAdapter = (buffer: ByteBuffer, obj: Publishing) => {
        this.append(buffer, obj.isPublishingManager);
        this.append(buffer, obj.publishRightsReceived);
        this.append(buffer, obj.publishRightsForwarded);
    }

    private blockDataAdapter = (buffer: ByteBuffer, obj: BlockData) => {
        buffer.writeUint16(obj.refBlockNum);
        buffer.writeUint32(obj.refBlockPrefix);
        buffer.writeUint32(obj.expiration);
    }

    private transactionAdapter = (buffer: ByteBuffer, obj: Transaction) => {
        this.append(buffer, obj.blockData);
        this.append(buffer, obj.operations);
        this.append(buffer, obj.extensions);
    }

}
