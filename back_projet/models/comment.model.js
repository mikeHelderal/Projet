export default (connection, DataTypes) => {
    connection.define(
        'Comment',
        {
            comment: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, { timestamps: true }
    );
}