const mongoosePaginate = require("mongoose-paginate-v2");

module.exports = (mongoose) => {
    const Users = mongoose.model(
        "Users",
        mongoose
            .Schema(
                {
                    name: String,
                    role: String,
                    age: Number,
                    email: {
                        type: String,
                        unique: true,
                    },
                    password: String,
                    phone: {
                        type: String,
                        unique: true,
                    },
                    last_login: Date,
                },
                { timestamps: true }
            )
            .plugin(mongoosePaginate)
    );

    return Users;
};
