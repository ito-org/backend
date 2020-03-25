import { ParsedUrlQuery } from 'querystring';
import { ApiError } from '../../model';

export class CmGetListQueryParams {

    private constructor( public readonly page: string | null | undefined ) {}

    static isCmGetListQueryParams( something: unknown ): something is CmGetListQueryParams {
        if ( something === null || something === undefined ) {
            return true;
        }

        if ( Array.isArray((<CmGetListQueryParams>something).page) ) {
            return false;
        }

        return (<CmGetListQueryParams>something).page === undefined
            || (<CmGetListQueryParams>something).page === null
            || typeof (<CmGetListQueryParams>something).page === 'string';

    }

    static constructFrom( parsedUrlQuery: ParsedUrlQuery ): CmGetListQueryParams | never {
        if ( CmGetListQueryParams.isCmGetListQueryParams(parsedUrlQuery) ) {
            return new CmGetListQueryParams(parsedUrlQuery.page);
        } else {
            throw new ApiError(400, 'Invalid Query Params. Expected { page: string | null | undefined }');
        }
    }


}
