import { Expose } from "class-transformer";
import { BaseOperation } from "./operations/BaseOperation";

export class ProcessedTransaction {
    @Expose({ name: "signatures" })
    public signatures: string[];

    @Expose({ name: "extensions" })
    public extensions: any[];

    @Expose({ name: "operations" })
    public operations: BaseOperation[];

    @Expose({ name: "expiration" })
    public expiration: Date;

    @Expose({ name: "ref_block_num" })
    public refBlockNum: number;

    @Expose({ name: "ref_block_prefix" })
    public refBlockPrefix: number;

    @Expose({ name: "operation_results" })
    public opResults: any[];
}
