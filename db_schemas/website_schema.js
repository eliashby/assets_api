const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_CONN_URL, {
  useNewUrlParser: true,
});

const WebsiteArchive = new Schema({
  url: String,
  media_type: String,
  media_channel: String,
  property_type: String,
  platform_type: String,
  draw_name: String,
  form_type: {
    type: String,
    default: 'N/A'
  },
  tags: [String],
  consversion_rate: {
    type: Number,
    default: 0
  },
  traffic_count: {
    type: Number,
    default: 0
  },
  test_reason: String,
  test_conclusion: String,
  archived: {
    type: Boolean,
    default: false,
  },
  compliance_approved: {
    type: Boolean,
    default: false,
  },
  compliance_update: {
    type: Boolean,
    default: false,
  },
  version: String,
  creation_date: String,
  last_updated: String,
  updated_by: String,
  documentation_url: String,
});

WebsiteArchive.pre('save', (next) => {
  const currentDate = new Date();

  this.creation_date = currentDate;

  if (!this.creation_date) {
    this.creation_date = currentDate;
  }
  next();
});

WebsiteArchive.pre('findOneAndUpdate', (next) => {
  const currentDate = new Date();

  this.last_updated = currentDate;

  if (!this.last_updated) {
    this.last_updated = currentDate;
  }
  next();
});

module.exports = mongoose.model('website_asset', WebsiteArchive);
