const { default: autoBind } = require('auto-bind');
const { meetingModel } = require('../../models/meeting.model');
const createHttpError = require('http-errors');

class MeetingService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = meetingModel;
  }
  async create(meetDto) {
    const data = await this.#model.create(meetDto);
    return data;
  }

  async getAllMeet() {
    const data = await this.#model.find({}).sort({ _id: -1 });
    return data;
  }

  async getAllMeetUsers(userId) {
    const data = await this.#model
      .find({ userId })
      .populate('users', 'email password')
      .sort({ _id: -1 });

    return data;
  }

  async getMeetById(id) {
    const data = await this.#model.findById(id);
    return data;
  }

  async updateMeeting(updateDto) {
    const { id, title, description } = updateDto;
    const meet = await this.getMeetById(id);
    if (!meet) {
      throw createHttpError.NotFound('Not Found Meet');
    }
    const data = await this.#model.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    return data;
  }

  async deleteMeet(id) {
    const data = await this.#model.findByIdAndDelete(id, { new: true });
    return data;
  }
}

module.exports = new MeetingService();
