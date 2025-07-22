import React, { useState } from "react";

const Progress = ({ progress }) => {
    return (
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
                <span className="font-semibold text-sm dark:text-gray-200">Progress</span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full 
                text-teal-600 bg-teal-200 dark:text-teal-100 dark:bg-teal-700">
                    {progress}% Complete
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                    className="bg-teal-600 text-xs leading-none py-1 text-center text-teal-100"
                    style={{ width: `${progress}%` }}
                >
                    &nbsp;
                </div>
            </div>
        </div>
    );
};

const TodoTable = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-gray-600 dark:text-gray-300">
                <thead>
                    <tr className="bg-[#0066BC] text-white">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Date Created</th>
                        <th className="px-4 py-2">Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr
                            key={index}
                            className="border-b dark:border-gray-700 hover:bg-[#3388D1] transition duration-300"
                        >
                            <td className="px-4 py-2">{task.title}</td>
                            <td className="px-4 py-2">{task.description}</td>
                            <td className="px-4 py-2">{task.dateCreated}</td>
                            <td className="px-4 py-2">{task.createdBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default function Tasks() {
    const [selected, setSelected] = useState('todo');

    const tasks = [
        { title: 'Task 1', description: 'Task 1 Description', dateCreated: '2023-03-10', createdBy: 'John Doe', status: 'todo', progress: 0 },
        { title: 'Task 2', description: 'Task 2 Description', dateCreated: '2023-03-11', createdBy: 'Jane Smith', status: 'progress', progress: 45 },
        { title: 'Task 3', description: 'Task 3 Description', dateCreated: '2023-03-12', createdBy: 'Alice Brown', status: 'review', progress: 100 },
        { title: 'Task 4', description: 'Task 4 Description', dateCreated: '2023-03-13', createdBy: 'Bob White', status: 'done', progress: 100 },
    ];

    const taskCounts = {
        todo: tasks.filter(task => task.status === 'todo').length,
        progress: tasks.filter(task => task.status === 'progress').length,
        review: tasks.filter(task => task.status === 'review').length,
        done: tasks.filter(task => task.status === 'done').length,
    };

    return (
        <>
            {/* Boutons de sélection des catégories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {["todo", "progress", "review", "done"].map((category) => (
                    <div
                        key={category}
                        className={`p-6 text-white text-center rounded-lg cursor-pointer
                        ${selected === category ? "border-4 border-white" : ""} 
                        ${
                            category === "todo" ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800" :
                            category === "progress" ? "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800" :
                            category === "review" ? "bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800" :
                            "bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setSelected(category)}
                    >
                        <h3 className="text-xl font-bold capitalize">{category}</h3>
                        <p className="text-lg">{taskCounts[category]} tasks</p>
                    </div>
                ))}
            </div>

            {/* Contenu des tâches sans div entourant */}
            {selected === 'todo' && <TodoTable tasks={tasks.filter(task => task.status === 'todo')} />}
            {selected === 'progress' && tasks.filter(task => task.status === 'progress').map((task, index) => (
                <Progress key={index} progress={task.progress} />
            ))}
            {selected === 'review' && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                    <p>Here you can see the task reviews.</p>
                </div>
            )}
            {selected === 'done' && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
                    <p>These are tasks that have full progress.</p>
                </div>
            )}
        </>
    );
}
