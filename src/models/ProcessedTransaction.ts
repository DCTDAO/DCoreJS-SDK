import { Expose } from "class-transformer";
import { Moment } from "moment";
import { OperationsToClass } from "../net/adapter/OperationAdapter";
import { MomentToClass } from "../net/adapter/TypeAdapters";
import { BaseOperation } from "./operation/BaseOperation";
import { Transaction } from "./Transaction";

export class ProcessedTransaction {
    @Expose({ name: "signatures" })
    public signatures: string[];

    @Expose({ name: "extensions" })
    public extensions: any[];

    @OperationsToClass
    @Expose({ name: "operations" })
    public operations: BaseOperation[];

    @MomentToClass
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @Expose({ name: "ref_block_num" })
    public refBlockNum: number;

    @Expose({ name: "ref_block_prefix" })
    public refBlockPrefix: number;

    @Expose({ name: "operation_results" })
    public opResults: any[];

    public get transaction(): Transaction {
        return new Transaction(this.operations, this.expiration, this.refBlockNum, this.refBlockPrefix, undefined, this.extensions, this.signatures);
    }

    public get id(): string {
        return this.transaction.id;
    }
}
