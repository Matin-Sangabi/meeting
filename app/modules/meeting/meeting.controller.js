const { default: autoBind } = require('auto-bind');
const meetingService = require('./meeting.service');

class MeetingController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = meetingService;
  }

  async create(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { title, description } = req.body;
      const data = await this.#service.create({ userId, title, description });
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllMeeting(req, res, next) {
    try {
      const data = await this.#service.getAllMeet();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getAllMeetingUsers(req, res, next) {
    try {
      const { id: userId } = req.user;
      const data = await this.#service.getAllMeetUsers(userId);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getMeetingById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await this.#service.getMeetById(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateMeeting(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const data = await this.#service.updateMeeting({
        id,
        title,
        description,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteMeet(req, res, next) {
    try {
      const { id } = req.params;
      const data = await this.#service.deleteMeet(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeetingController();
