export default (connection, DataTypes) => {
    connection.define(
        'Comments',
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date_comment: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, { timestamps: true }
    );
}