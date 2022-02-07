import { Patient } from './Patient';
import { Pager } from './Pager';

export interface PatientWithPager {
    data: Patient[];
    pagination: Pager;
}