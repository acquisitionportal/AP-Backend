import mongoose from "mongoose";

export interface Tests extends mongoose.Document {
    test_id: string;
    isPaid: boolean;
    status: boolean;
    label: string;
    description: string;
    questions: number;
    duration: number;
    sections: [
        {
            id: string;
            section_id: string;
            lable: string;
            description: string;
        }
    ];
}

const TestSchema = new mongoose.Schema<Tests>({
    test_id: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    questions: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    sections: [
        {
            id: {
                type: String,
                required: true,
            },
            section_id: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
        },
    ],
});

export default mongoose.models.Test ||
    mongoose.model<Tests>("Test", TestSchema);

