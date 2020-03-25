export interface CmPatchTogglesPayload {
    enable: Array<CmToggle>;
    disable: Array<CmToggle>;
}

export type CmToggle = 'REGION_BUCKETS'
