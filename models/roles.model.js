const mongoosePaginate = require("mongoose-paginate-v2");

module.exports = (mongoose) => {
    const Roles = mongoose.model(
        "Roles",
        mongoose
            .Schema(
                {
                    name: {
                        type: String,
                        enum: ["admin", "user"],
                    },
                },
                { timestamps: true }
            )
            .plugin(mongoosePaginate)
    );

    return Roles;
};
