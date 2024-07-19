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
            image: {
                type: DataTypes.STRING,
                allowNull: true
            },
            is_valid: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            date_publication: {
                type: DataTypes.DATE,
                allowNull: true
            },
        }, { timestamps: true }
    );
}