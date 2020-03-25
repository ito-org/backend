import { Injectable } from 'skeidjs';

@Injectable()
export class FeatureToggleService {

    private static activeToggles: Array<Feature> = [];

    constructor() {}

    switchToggle( toggle: Feature, isActive: boolean ) {
        if (isActive) {
            FeatureToggleService.activeToggles.push(toggle);
        } else {
            FeatureToggleService.activeToggles = FeatureToggleService.activeToggles.filter(t => t.name !== toggle.name);
        }
    }

    patchCollection( enable: Array<string>, disable: Array<string> ) {
        enable.map(Feature.of).forEach(f => this.switchToggle(f, true));
        disable.map(Feature.of).forEach(f => this.switchToggle(f, false));
    }

    isActive( toggle: string ): boolean {
        return !!FeatureToggleService.activeToggles.filter(t => t.name === Feature.of(toggle).name).length;
    }
}

export type FeatureName = 'REGION_BUCKETS'

function isFeatureName(something: unknown): something is FeatureName {
    return something === 'REGION_BUCKETS';
}

export class Feature {
    name: FeatureName;

    public constructor(name: FeatureName) {
        this.name = name;
    }

    static of(name: string | FeatureName): Feature | never {
        if (isFeatureName(name)) {
            return new Feature(name);
        }
        else throw new TypeError(`'${name} is no valid feature'`);
    }
}



