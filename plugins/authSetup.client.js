import { useAuthStore } from "@/stores/auth";

const PROTECTED_ROUTES = ['/']
const GUEST_ONLY_ROUTES = ['/login', '/signup']

export default defineNuxtPlugin(() => {
    const authStore = useAuthStore()
    const router = useRouter()

    authStore.setupAuthListener()

    const redirectUser = () => {
            const { path } = router.currentRoute.value
        if (authStore.user) {
            if (GUEST_ONLY_ROUTES.includes(path)) {
                router.push('/')
            }
        } else {
            if (PROTECTED_ROUTES.includes(path)) {
                router.push('/login')
            }
        }
    }

    watch(() => authStore.user, () => redirectUser())
})