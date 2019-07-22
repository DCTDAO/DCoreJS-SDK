import { deserialize, Expose, Transform, Type } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { ChainObjectToClass, CoAuthorsToClass, LongToClass, MomentToClass } from "../net/adapter/TypeAdapters";
import { AssetAmount } from "./AssetAmount";
import { ChainObject } from "./ChainObject";
import { Synopsis } from "./Synopsis";

export class ContentSummary {

    @ChainObjectToClass
    @Expose({ name: "id" })
    public id: ChainObject;

    @Expose({ name: "author" })
    public author: string;

    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @Transform((value: string) => deserialize(Synopsis, value), { toClassOnly: true })
    @Expose({ name: "synopsis" })
    public synopsis: Synopsis;

    @Expose({ name: "_hash" })
    public hash: string;

    @Expose({ name: "status" })
    public status: string;

    @Expose({ name: "URI" })
    public uri: string;

    // UInt64
    @LongToClass
    @Expose({ name: "AVG_rating" })
    public rating: Long;

    // UInt64
    @LongToClass
    @Expose({ name: "size" })
    public size: Long;

    @MomentToClass
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @MomentToClass
    @Expose({ name: "created" })
    public created: Moment;

    // UInt32
    @CoAuthorsToClass
    @Expose({ name: "co_authors" })
    public coAuthors: Array<[ChainObject, number]>;

    // UInt32
    @Expose({ name: "times_bought" })
    public timesBought: number;
}