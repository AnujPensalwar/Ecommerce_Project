import { createAction, props} from "@ngrx/store"


export const getUserProfile=createAction('[User] Get User Profile')

export const getUserProfileSuccess=createAction('[User] get User Profile Success',props<{userProfile:any}>())

export const getUserProfileFailure=createAction('[User] Get User Profile Failure',props<{error:any}>())



export const logOutSuccess=createAction('[User] Logout Success')