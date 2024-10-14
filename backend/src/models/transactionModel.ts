import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

transactionSchema.index({ userId: 1, createdAt: -1 })

export const Transaction = model('Transaction', transactionSchema)