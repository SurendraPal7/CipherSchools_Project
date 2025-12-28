import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    question: { type: String, required: true },
    sampleTables: [{
        tableName: String,
        columns: [{
            columnName: String,
            dataType: String
        }],
        rows: mongoose.Schema.Types.Mixed
    }],
    schemaName: { type: String, required: true },
    expectedOutput: {
        type: { type: String, enum: ['table', 'single_value', 'column', 'count'], required: true },
        value: mongoose.Schema.Types.Mixed
    }
}, { timestamps: true });

export default mongoose.model('Assignment', AssignmentSchema);
