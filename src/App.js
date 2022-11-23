import React from "react";

import "./App.css";
import { ZoomMtg } from "@zoomus/websdk";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.9.0/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function App() {
  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  // var signatureEndpoint = ''
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  // var sdkKey = ''
  // var meetingNumber = '123456789'
  // var role = 0
  // var leaveUrl = 'http://localhost:3000'
  // var userName = 'React'
  // var userEmail = ''
  // var passWord = ''
  const meetingURL =
    "https://us04web.zoom.us/j/79198330405?pwd=YYJjOsefrBMJtN94HLHa4M2iZogLjR.1";
  const meetingId = meetingURL.split("j/")[1].split("?")[0];
  const meetingPwd = meetingURL.split("j/")[1].split("pwd=")[1];

  const signatureEndpoint = "http://localhost:4000";
  const sdkKey = "1YMtPEdr0zZEkZtGi2OrZ4aj7zE3r2cPmgg4";
  const meetingNumber = meetingId;
  const role = 0;
  const leaveUrl = "http://localhost:3001";
  const userName = "kulbir";
  const userEmail = "kulbir24@hormail.com";
  const passWord = meetingPwd;
  const registrantToken = "";
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  // var registrantToken = ''

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
