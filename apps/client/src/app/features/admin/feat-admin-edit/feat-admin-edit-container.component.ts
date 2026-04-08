import { adminEditUtil } from './utils/admin-edit-util';
import { adminEditStore } from './data/admin-edit-store';
import { showAdminComponent } from './ui/show-admin.component';
import { adminApi } from '../api/admin-api';

export const FeatAdminEditContainerComponent = true;

const utils = adminEditUtil
const data = adminEditStore;
const ui = showAdminComponent
const api = adminApi
