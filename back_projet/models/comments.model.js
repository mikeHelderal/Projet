export default (connection, DataTypes) => {
    connection.define(
        'Comments',
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, { timestamps: true }
    );
}