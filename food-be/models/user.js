import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        role: { type: String, enum: ["Admin", "Manager", "Member"], default: "Member" },
        country: { type: String, enum: ["India", "America"], required: true },
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password)
};

export default mongoose.model("User", userSchema);
