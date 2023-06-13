import {Notify, Loading} from 'notiflix'

export const useNotify = (type, message) => {
    const timeoutNotify = 2000
    if (typeof message === "object"){
        message = [...message].toString()
    }
    if(typeof window !== 'undefined'){
        switch (type) {
            case 'success': {
                Notify.success(message, { clickToClose: true, showOnlyTheLastOne: false, timeout: timeoutNotify, cssAnimationStyle: 'from-right' })
                break
            }
            case 'error': {
                Notify.failure(message, { clickToClose: true, showOnlyTheLastOne: false, timeout: timeoutNotify, cssAnimationStyle: 'from-right' })
                break
            }
            case 'warning': {
                Notify.warning(message, { clickToClose: true, showOnlyTheLastOne: false, timeout: timeoutNotify, cssAnimationStyle: 'from-right' })
                break
            }
            case 'info': {
                Notify.info(message, { clickToClose: true, showOnlyTheLastOne: false, timeout: timeoutNotify, cssAnimationStyle: 'from-right' })
                break
            }
            case 'showLoading': {
                Loading.hourglass(message, { clickToClose: false })
                break
            }
            case 'hideLoading': {
                Loading.remove()
                break
            }
            default: {}
        
        }
    }
    
    
}
