import {
    Component,
    Get,
    Request,
    Response
} from 'skeidjs';
import * as url from 'url';
import { CmGetListQueryParams } from './model';
import { ApiError } from '../model';

@Component({
    route: '/list'
})
export class ListController {
    constructor() {}

    @Get({ route: '' })
    getList( request: Request, response: Response ): void {
        const queryParams: CmGetListQueryParams = CmGetListQueryParams
            .constructFrom(url.parse(request.url, true).query);

        const acceptedMedia = request.headers.accept.replace(' ', '').split(';');
        const clientMediaType: string = this.findBestMediaType(acceptedMedia);


    }

    private findBestMediaType( clientsPreferences: Array<string> ): string | never {
        const supportedMediaTypes: Array<string> = ['application/json', 'text/'];

        const bestMediaType: string | undefined = clientsPreferences.reduce((best: undefined | string, current) => {
            if ( best !== undefined ) {
                return best;
            }
            return supportedMediaTypes.filter(mime => mime === current)[0];
        }, undefined);

        if ( bestMediaType === undefined ) {
            throw new ApiError(400,
               `No matching accepted media type. Supported types are [${ supportedMediaTypes.join(',') }]`);
        }

        return bestMediaType;
    }
}
