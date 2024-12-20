import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>
          Dashboard :: HONEST N ONLINE MARKETING
        </title>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width, initial-scale=1.0"
          name="viewport"
        /><meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link
          href="css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="css/core.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="css/components.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* <link
          href="https://aaa-client.in/css/icons.css"
          rel="stylesheet"
          type="text/css"
        /> */}
        <link
          href="css/pages.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="css/responsive.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="css/style.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="plugins/datatables/jquery.dataTables.min.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* <link
          href="plugins/datatables/buttons.bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="plugins/datatables/dataTables.bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="plugins/datatables/responsive.bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        /> */}
        <meta
          content="noindex"
          name="robots"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: '      .go1475592160 {        height: 0;      }      .go1671063245 {        height: auto;      }      .go1888806478 {        display: flex;        flex-wrap: wrap;        flex-grow: 1;      }      @media (min-width: 600px) {        .go1888806478 {          flex-grow: initial;          min-width: 288px;        }      }      .go167266335 {        background-color: #313131;        font-size: 0.875rem;        line-height: 1.43;        letter-spacing: 0.01071em;        color: #fff;        align-items: center;        padding: 6px 16px;        border-radius: 4px;        box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),          0px 6px 10px 0px rgba(0, 0, 0, 0.14),          0px 1px 18px 0px rgba(0, 0, 0, 0.12);      }      .go3162094071 {        padding-left: 20px;      }      .go3844575157 {        background-color: #313131;      }      .go1725278324 {        background-color: #43a047;      }      .go3651055292 {        background-color: #d32f2f;      }      .go4215275574 {        background-color: #ff9800;      }      .go1930647212 {        background-color: #2196f3;      }      .go946087465 {        display: flex;        align-items: center;        padding: 8px 0;      }      .go703367398 {        display: flex;        align-items: center;        margin-left: auto;        padding-left: 16px;        margin-right: -8px;      }      .go3963613292 {        width: 100%;        position: relative;        transform: translateX(0);        top: 0;        right: 0;        bottom: 0;        left: 0;        min-width: 288px;      }      .go1141946668 {        box-sizing: border-box;        display: flex;        max-height: 100%;        position: fixed;        z-index: 1400;        height: auto;        width: auto;        transition: top 300ms ease 0ms, right 300ms ease 0ms,          bottom 300ms ease 0ms, left 300ms ease 0ms, max-width 300ms ease 0ms;        pointer-events: none;        max-width: calc(100% - 40px);      }      .go1141946668 .notistack-CollapseWrapper {        padding: 6px 0px;        transition: padding 300ms ease 0ms;      }      @media (max-width: 599.95px) {        .go1141946668 {          width: 100%;          max-width: calc(100% - 32px);        }      }      .go3868796639 .notistack-CollapseWrapper {        padding: 2px 0px;      }      .go3118922589 {        top: 14px;        flex-direction: column;      }      .go1453831412 {        bottom: 14px;        flex-direction: column-reverse;      }      .go4027089540 {        left: 20px;      }      @media (min-width: 600px) {        .go4027089540 {          align-items: flex-start;        }      }      @media (max-width: 599.95px) {        .go4027089540 {          left: 16px;        }      }      .go2989568495 {        right: 20px;      }      @media (min-width: 600px) {        .go2989568495 {          align-items: flex-end;        }      }      @media (max-width: 599.95px) {        .go2989568495 {          right: 16px;        }      }      .go4034260886 {        left: 50%;        transform: translateX(-50%);      }      @media (min-width: 600px) {        .go4034260886 {          align-items: center;        }      }    '
          }}
          id="_goober"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: '      .audio-recorder {        background-color: #ebebeb;        box-shadow: 0 2px 5px #bebebe;        border-radius: 20px;        box-sizing: border-box;        color: #000;        width: 40px;        display: flex;        align-items: center;        transition: all 0.2s ease-in;        -webkit-tap-highlight-color: transparent;      }      .audio-recorder-mic {        box-sizing: content-box;        cursor: pointer;        height: 16px;        color: #000;        padding: 12px;      }      .audio-recorder .audio-recorder-mic {        border-radius: 20px;      }      .audio-recorder.recording .audio-recorder-mic {        border-radius: 0;      }      .audio-recorder-timer,      .audio-recorder-status {        color: #000;        margin-left: 10px;        font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;        font-size: 14px;        font-weight: 400;        line-height: 1;      }      .audio-recorder-status {        margin-left: 15px;        display: flex;        align-items: baseline;        flex-grow: 1;        animation-name: fading-ar-status;        animation-duration: 2s;        animation-iteration-count: infinite;      }      .audio-recorder-status-dot {        background-color: #d00;        border-radius: 50%;        height: 10px;        width: 9px;        margin-right: 5px;      }      .audio-recorder-options {        box-sizing: content-box;        height: 16px;        cursor: pointer;        padding: 12px 6px 12px 12px;      }      .audio-recorder-options ~ .audio-recorder-options {        padding: 12px 12px 12px 6px;        border-radius: 0 5px 5px 0;      }      .recording {        border-radius: 12px;        width: 300px;        transition: all 0.2s ease-out;      }      .display-none {        display: none;      }      .audio-recorder-visualizer {        margin-left: 15px;        flex-grow: 1;        align-self: center;        display: flex;        align-items: center;      }      @keyframes fading-ar-status {        0% {          opacity: 1;        }        50% {          opacity: 0;        }        to {          opacity: 1;        }      }    '
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
