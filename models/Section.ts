import mongoose from "mongoose";

export interface Sections extends mongoose.Document {
    test_id: string;
    section_id: string;
    text: string;
    description: string;
    questions: [
        {
            text: string;
            options: [
                {
                    value: string;
                    detail: string;
                    correct: boolean;
                }
            ]
        }
    ]
}

const SectionsScema = new mongoose.Schema<Sections>({
    test_id: {
        type: String,
        required: true,
    },
    section_id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: [
        {
            text: {
                type: String,
                required: true,
            },
            options: [
                {
                    value: {
                        type: String,
                        required: true,
                    },
                    detail: {
                        type: String,
                        required: true,
                    },
                    correct: {
                        type: Boolean,
                        required: true,
                    }
                }
            ]
        }
    ]
})

export default mongoose.models.Sections ||
    mongoose.model<Sections>("Sections", SectionsScema);