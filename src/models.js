import { Sequelize, DataTypes } from 'sequelize';

const inTest = process.env.NODE_ENV === 'test';
console.log(inTest)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: !inTest,
    storage: inTest ? './db.sqlite3' : './db.sqlite3'
})

export const History = sequelize.define('History', {
    firstArg: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    secondArg: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    result: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    error: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export const Operation = sequelize.define('Operation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Operation.hasMany(History)
History.belongsTo(Operation)

export async function createHistoryEntry({ firstArg, secondArg, operationName, result, error }) {
    const operation = await Operation.findOne({
        where: {
            name: operationName
        }
    });
    return History.create({
        firstArg,
        secondArg,
        result,
        error,
        OperationId: operation.id
    })
}

export function createTables() {
    return Promise.all([
        History.sync({ force: true }),
        Operation.sync({ force: true })
    ]);
}

export async function getAllHistory() { 
    return History.findAll({
    include: [Operation]
    });
}

export async function deleteAllHistory() { 
    await History.destroy({
        where: {},
        truncate: true
    });
}

export async function historyById(id) {
    const historialID = await History.findOne({
        where: { id: id },
        include: [Operation]
    });

    return historialID
}
