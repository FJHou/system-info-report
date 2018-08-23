const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userAgentSchemas = new Schema({
  ua: String,
  _uid: String,
  browser: {
    name: String,
    version: String,
    major: String,
  },
  engine: {
    name: String,
    version: String
  },
  os: {
    name: String,
    version: String
  },
  device: Schema.Types.Mixed,
  cpu: {
    architecture: String
  },
  ip: String,
  time: String,
  token: String,
  phone: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    upDatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

userAgentSchemas.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('userAgents', userAgentSchemas)