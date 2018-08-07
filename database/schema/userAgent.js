const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userAgentSchema = new Schema({
  userAgent: String,
  ipAddress: String,
  userToken: String,
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

userAgentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('userAgent', userAgentSchema)