export default (connection, DataTypes) => {
    connection.define(
        'Publications',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            resume: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_valid: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            date_publication: {
                type: DataTypes.DATE,
                allowNull: false
            },
        }, { timestamps: true }
    );
}