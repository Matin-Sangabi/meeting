const meetingController = require('./meeting.controller');

const router = require('express').Router();

router.post('/create-meet', meetingController.create);
router.get('/all-meet', meetingController.getAllMeeting);
router.get('/all-meet-users', meetingController.getAllMeetingUsers);
router
  .route('/meet/:id')
  .get(meetingController.getMeetingById)
  .put(meetingController.updateMeeting)
  .delete(meetingController.deleteMeet);

module.exports = {
  meetRoutes: router,
};
