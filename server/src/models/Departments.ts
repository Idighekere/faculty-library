import { IDepartment } from '@/common/types';
import { getDepartmentShortName } from '@/common/utils';
import mongoose, { Schema, Document } from 'mongoose';

const DepartmentSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (name: string) {
                return !(name.includes('engineering'))
            },
            message: "Department name must be in full"
        }
    },
    logo: {
        type: String,
        // required: true,
        default: ""
    },
    association: {
        type: String,
        default: ""
    },
    shortName: {
        type: String,
        default: "", uppercase: true,
        trim: true,
        match: [/^[A-Z]{2,3}$/, 'Please enter a valid short name'],
    }
},
    { timestamps: true }
);



DepartmentSchema.pre('save', function (next) {

    this.shortName = getDepartmentShortName(this.name as string)
    next()
})


const Department = mongoose.model<IDepartment>('Department', DepartmentSchema);

export default Department;
