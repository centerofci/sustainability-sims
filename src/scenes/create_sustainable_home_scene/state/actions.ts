import { user_info_actions } from "./user_info/actions"



export const ACTIONS = {
    setup_complete: () => ({ type: "setup_complete" }),
    user_info: user_info_actions,
}
