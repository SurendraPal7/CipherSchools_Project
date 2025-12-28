
import mongoose from 'mongoose';
import Assignment from './models/Assignment.js';
import dotenv from 'dotenv';
dotenv.config();

const dataset = [
    {
        "title": "Find High Salary Employees",
        "description": "Easy",
        "question": "List all employees earning more than 50,000",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    { "columnName": "id", "dataType": "INTEGER" },
                    { "columnName": "name", "dataType": "TEXT" },
                    { "columnName": "salary", "dataType": "INTEGER" },
                    { "columnName": "department", "dataType": "TEXT" }
                ],
                "rows": [
                    { "id": 1, "name": "Alice", "salary": 45000, "department": "HR" },
                    { "id": 2, "name": "Bob", "salary": 60000, "department": "Engineering" },
                    { "id": 3, "name": "Charlie", "salary": 75000, "department": "Engineering" },
                    { "id": 4, "name": "Diana", "salary": 48000, "department": "Sales" }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                { "id": 2, "name": "Bob", "salary": 60000, "department": "Engineering" },
                { "id": 3, "name": "Charlie", "salary": 75000, "department": "Engineering" }
            ]
        }
    },
    {
        "title": "Department-wise Employee Count",
        "description": "Medium",
        "question": "Find the number of employees in each department",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    { "columnName": "id", "dataType": "INTEGER" },
                    { "columnName": "name", "dataType": "TEXT" },
                    { "columnName": "department", "dataType": "TEXT" }
                ],
                "rows": [
                    { "id": 1, "name": "Alice", "department": "HR" },
                    { "id": 2, "name": "Bob", "department": "Engineering" },
                    { "id": 3, "name": "Charlie", "department": "Engineering" },
                    { "id": 4, "name": "Diana", "department": "Sales" },
                    { "id": 5, "name": "Eve", "department": "Sales" }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                { "department": "HR", "count": 1 },
                { "department": "Engineering", "count": 2 },
                { "department": "Sales", "count": 2 }
            ]
        }
    },
    {
        "title": "Total Order Value per Customer",
        "description": "Medium",
        "question": "Find total order value for each customer",
        "sampleTables": [
            {
                "tableName": "customers",
                "columns": [
                    { "columnName": "id", "dataType": "INTEGER" },
                    { "columnName": "name", "dataType": "TEXT" }
                ],
                "rows": [
                    { "id": 1, "name": "Aman" },
                    { "id": 2, "name": "Saurabh" }
                ]
            },
            {
                "tableName": "orders",
                "columns": [
                    { "columnName": "id", "dataType": "INTEGER" },
                    { "columnName": "customer_id", "dataType": "INTEGER" },
                    { "columnName": "amount", "dataType": "REAL" }
                ],
                "rows": [
                    { "id": 1, "customer_id": 1, "amount": 1200.5 },
                    { "id": 2, "customer_id": 1, "amount": 800.0 },
                    { "id": 3, "customer_id": 2, "amount": 1500.0 }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                { "name": "Aman", "total_amount": 2000.5 },
                { "name": "Saurabh", "total_amount": 1500.0 }
            ]
        }
    },
    {
        "title": "Highest Paid Employee",
        "description": "Hard",
        "question": "Find the employee(s) with the highest salary",
        "sampleTables": [
            {
                "tableName": "employees",
                "columns": [
                    { "columnName": "id", "dataType": "INTEGER" },
                    { "columnName": "name", "dataType": "TEXT" },
                    { "columnName": "salary", "dataType": "INTEGER" }
                ],
                "rows": [
                    { "id": 1, "name": "Alice", "salary": 70000 },
                    { "id": 2, "name": "Bob", "salary": 85000 },
                    { "id": 3, "name": "Charlie", "salary": 85000 }
                ]
            }
        ],
        "expectedOutput": {
            "type": "table",
            "value": [
                { "id": 2, "name": "Bob", "salary": 85000 },
                { "id": 3, "name": "Charlie", "salary": 85000 }
            ]
        }
    }
];

const seedData = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    await Assignment.deleteMany({});

    try {
        for (let i = 0; i < dataset.length; i++) {
            const data = dataset[i];

            const assignment = new Assignment({
                title: data.title,
                description: `Solve: ${data.question} `,
                difficulty: data.description,
                question: data.question,
                sampleTables: data.sampleTables,
                expectedOutput: data.expectedOutput,
                schemaName: 'sqlite_memory'
            });
            await assignment.save();
            console.log(`Saved Assignment: ${data.title} `);
        }
        console.log('All assignments seeded successfully into MongoDB.');
    } catch (err) {
        console.error('Seed Error:', err);
    } finally {
        mongoose.disconnect();
    }
};

seedData();
