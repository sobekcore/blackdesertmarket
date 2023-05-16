import { Ref, ref } from 'vue';
import { ToastInterface, useToast } from 'vue-toastification';
import { NotificationType } from '@/enums/notification';
import { TranslateKey, useInject } from '@/composables/use-inject';
import AppNotification from '@/components/Base/AppNotification.vue';

export interface UseNotificationReturn {
  show(type: NotificationType, message: string): void;
}

export function useNotification(): UseNotificationReturn {
  const translate = useInject(TranslateKey);
  const toast: ToastInterface = useToast();

  const show = (type: NotificationType, message: string): void => {
    const title: Ref<string> = ref('');

    switch (type) {
      case NotificationType.SUCCESS:
        title.value = translate('notification.successTitle');
        break;
      case NotificationType.ERROR:
        title.value = translate('notification.errorTitle');
        break;
    }

    toast(
      {
        component: AppNotification,
        props: {
          title: title.value,
          message: translate(message),
        },
      },
      {
        toastClassName: type,
      },
    );
  };

  return {
    show,
  };
}
