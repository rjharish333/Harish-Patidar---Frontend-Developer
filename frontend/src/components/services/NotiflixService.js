import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

// Alerts for application
Loading.init({
  svgColor: "#076AFE",
});

Notify.init({
  clickToClose: true,
});

export const Spinner = {
  show: () => {
    Loading.circle();
  },
  hide: () => {
    Loading.remove();
  },
};

export const Alert = {
  success: (_msg = "") => {
    return Notify.success(_msg ? _msg : "Success");
  },
  warning: (_msg = "") => {
    Notify.warning(_msg ? _msg : "Warning");
  },
  info: (_msg = "") => {
    Notify.info(_msg ? _msg : "Info");
  },
  error: (_msg = "") => {
    Notify.failure(_msg ? _msg : "Error");
  },
};
