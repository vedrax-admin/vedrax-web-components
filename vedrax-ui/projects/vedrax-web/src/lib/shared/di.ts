import { InjectionToken } from '@angular/core';
import { Configuration } from './configuration';


export const VEDRAX_CONFIG_TOKEN = new InjectionToken<Configuration>('VEDRAX_CONFIG');