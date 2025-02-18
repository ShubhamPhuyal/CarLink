import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({ showSpinner: false });

const handleStart = () => NProgress.start();
const handleStop = () => NProgress.done();

Router.events.on("routeChangeStart", handleStart);
Router.events.on("routeChangeComplete", handleStop);
Router.events.on("routeChangeError", handleStop);

export default function ProgressBar() {
  return null; // This component just triggers the events
}
