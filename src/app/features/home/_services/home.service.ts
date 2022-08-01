import { Injectable } from '@angular/core';
import { ApiService, ApiResult } from 'src/app/core/services/api.service';

@Injectable()
export class HomeService {

    constructor(
        private api: ApiService,
    ) { }
}
