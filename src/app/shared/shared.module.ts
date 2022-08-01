import { NgModule } from '@angular/core';

// Standard NG Zorro
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@NgModule({
    declarations: [],
    imports: [
        // Ng Zorro
        NzLayoutModule,
        NzGridModule,
        NzMenuModule,
        NzPageHeaderModule,
        NzIconModule,
        NzAvatarModule,
    ],
    exports: [
        // Ng Zorro
        NzLayoutModule,
        NzGridModule,
        NzMenuModule,
        NzPageHeaderModule,
        NzIconModule,
        NzAvatarModule,
    ],
    providers: [

    ]
})
export class SharedModule { }
