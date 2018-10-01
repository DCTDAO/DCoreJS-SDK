import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { Content } from "../models/Content";
import { GetContentById } from "../net/models/request/GetContentById";
import { GetContentByUri } from "../net/models/request/GetContentByUri";
import { BaseApi } from "./BaseApi";

export class ContentApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * get content
     *
     * @param contentRef uri of the content or object id of the content, 2.13.*
     *
     * @return a content if found, {@link NotFoundError} otherwise
     */
    public getContent(contentRef: ChainObject | string): Observable<Content> {
        if (typeof contentRef === "string") {
            return this.request(new GetContentByUri(contentRef));
        } else {
            return this.request(new GetContentById(contentRef)).pipe(map((list) => list[0]));
        }
    }

}
