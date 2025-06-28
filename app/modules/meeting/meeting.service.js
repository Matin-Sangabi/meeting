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
    const { title, description, start_time, end_time, userId } = meetDto;
    const time = {
      start_time: start_time || '',
      end_time: end_time || '',
    };
    const data = await this.#model.create({ title, description, time, userId });
    return data;
  }

  async getAllMeet() {
    const data = await this.#model
      .find({})
      .populate('userId', 'email walletAddress')
      .sort({ _id: -1 });
    return data;
  }

  async getAllMeetUsers(userId) {
    const data = await this.#model
      .find({ userId })
      .populate('userId', 'email walletAddress')
      .sort({ _id: -1 });

    return data;
  }

  async getMeetById(id) {
    const data = await this.#model
      .findById(id)
      .populate('userId', 'email walletAddress');
    return data;
  }

  async updateMeeting(updateDto) {
    const { id, title, description, start_time, end_time } = updateDto;
    const meet = await this.getMeetById(id);
    if (!meet) {
      throw createHttpError.NotFound('Not Found Meet');
    }
    const data = await this.#model.findByIdAndUpdate(
      id,
      { title, description, time: { start_time, end_time } },
      { new: true }
    );
    return data;
  }

  async deleteMeet(id) {
    await this.#model.findByIdAndDelete(id, { new: true });
    return 'Meeting deleted successfully';
  }
}

module.exports = new MeetingService();
