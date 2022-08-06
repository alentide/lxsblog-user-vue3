


import { useAuthView } from './useAuthView';
import { useAuth } from './useAuth';
import { useAuthModal } from './useAuthModal';



export const auth = useAuthView(useAuth())

export const authModal = useAuthModal(auth)

export const loginModal = authModal