import { createAction, props } from '@ngrx/store';

export const startLoadingAction = createAction('[UI] Start Loading');
export const stopLoadingAction = createAction('[UI] Stop Loading');

// export const uiStatusAction = createAction(
//   '[UI] Status Of The Response Of Each Request ',
//   props<{ error: string; success: string }>()
// );
