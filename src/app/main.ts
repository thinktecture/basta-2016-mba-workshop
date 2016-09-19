import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './appModule';
import './rxOperators';
const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);
