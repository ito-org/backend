import {
    Application,
    ErrorHandlerResult,
    OnError,
    Patch,
    Request,
    Response,
} from 'skeidjs';
import { FeatureToggleService } from '../service/feature-toggle.service';
import { ApiError, CmPatchTogglesPayload } from './model';
import { V0Module } from './v0/v0-module';

@Application({
    contentType: 'application/json',
    server: {
        port: 80,
        maxConnections: 10,
        timeout: 500,
        keepAliveTimeout: 500
    },
    modules: [V0Module]
})
class RSubOneBoot implements OnError {

    constructor( private togglzService: FeatureToggleService ) {}

    onError( error?: any ): ErrorHandlerResult {
        if ( error instanceof ApiError ) {
            return {
                status: error.status,
                payload: error
            };
        }

        return ({
            status: 500,
            payload: ''
        })
    }

    @Patch( { route: '/togglz' })
    patchToggles( request: Request, response: Response ) {
        const featurePatches = request.json() as CmPatchTogglesPayload;
        try {
            this.togglzService.patchCollection(featurePatches.enable, featurePatches.disable);
            response.status(204, 'Toggled').respond();
        } catch ( error ) {
            console.log(error);
            response.status(400, 'Bad Request').respond(error);
        }
    }


}
