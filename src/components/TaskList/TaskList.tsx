import React, { useContext } from 'react';

import { CheckIcon } from '../../assets';
import AppContext from '../../context/AppContext';
import { Button } from '../../ui';

import './TaskList.css';

export const TaskList: React.FC = () => {
    const { tasks, setTasks, setUserInfo } = useContext(AppContext);

    return (
        <div className="Task-container">
            <span className="Task-title">{tasks.length ? 'Tasks' : 'Task list is empty now'}</span>
            {tasks.map(({ id, name, amount, isCompleted, action }) => (
                <div className="Task-item" key={id}>
                    <span className="Task-text">
                        <span className="Task-name">{name}</span>
                        <span className="Task-amount">{amount} coins</span>
                    </span>
                    {!isCompleted ? (
                        <Button
                            onClick={async () => {
                                if (typeof action === 'string') {
                                    await window.open(action);

                                    setTasks((prevState) =>
                                        prevState.map((item) => {
                                            if (item.id === id) {
                                                return { ...item, isCompleted: true };
                                            }

                                            return item;
                                        }),
                                    );
                                    setUserInfo((prevState) => ({
                                        ...prevState,
                                        balance: prevState.balance + amount,
                                    }));
                                    return;
                                }

                                action();
                            }}
                        >
                            Try
                        </Button>
                    ) : (
                        <CheckIcon className="Task-icon" />
                    )}
                </div>
            ))}
        </div>
    );
};
