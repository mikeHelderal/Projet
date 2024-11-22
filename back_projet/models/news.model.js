export default (connection, DataTypes) => {
    connection.define(
        'News',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
            },
            is_valid: {
                type: DataTypes.BOOLEAN,
            },
            news_date: {
                type: DataTypes.DATE,
            },
        },
        { timestamps: true }
    );
}