// models/Stats.ts
import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  siteVisits: { type: Number, default: 1 },
  submissions: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

export const Logger = mongoose.model('Stats', statsSchema);
