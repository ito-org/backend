import { Module } from 'skeidjs';
import { ListController } from './list.controller';

@Module({
    route: '/v0',
    components: [ListController]
})
export class V0Module {
    constructor() {}
}
