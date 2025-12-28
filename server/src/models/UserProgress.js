import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    sqlQuery: String,
    isCompleted: { type: Boolean, default: false },
    attemptCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('UserProgress', UserProgressSchema);
