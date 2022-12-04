import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withModalMounter } from "/imports/ui/components/common/modal/service";
import { makeCall } from "/imports/ui/services/api";
import { RecordMeetings } from "/imports/api/meetings";
import Auth from "/imports/ui/services/auth";
import Users from "/imports/api/users";
import RecordingComponent from "./component";
import { Meteor } from "meteor/meteor";

const RecordingContainer = (props) => <RecordingComponent {...props} />;

export default withModalMounter(
  withTracker(({ mountModal }) => {
    const { recording, time } = RecordMeetings.findOne({
      meetingId: Auth.meetingID,
    });

    const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

    const selector = {
      meetingId: Auth.meetingID,
      userId: Auth.userID,
    };
    const user = Users.findOne(selector);

    return {
      toggleRecording: () => {
        makeCall("toggleRecording");
        if (user.role != ROLE_MODERATOR) {
          console.log("Recording notification for participant");
        }
        mountModal(null);
      },

      recordingStatus: recording,
      recordingTime: time,
      isMeteorConnected: Meteor.status().connected,
    };
  })(RecordingContainer)
);
