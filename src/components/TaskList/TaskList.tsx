import React, { useContext, useState } from 'react';

import { CheckIcon } from '../../assets';
import AppContext from '../../context/AppContext';
import { TaskStatus } from '../../typings';
import { Button } from '../../ui';

import './TaskList.css';

export const TaskList: React.FC = () => {
    const { tasks } = useContext(AppContext);

    const [loadingTaskId] = useState<number>();

    return (
        <div className="Task-container">
            <span className="Task-title">{tasks.length ? 'Tasks' : 'Task list is empty now'}</span>
            {tasks.map(({ id, name, status, reward }) => {
                const isCompleted = status === TaskStatus.Completed;

                return (
                    <div className="Task-item" key={id}>
                        <span className="Task-text">
                            <span className="Task-name">{name}</span>
                            <span className="Task-amount">{reward} coins</span>
                        </span>
                        {!isCompleted ? (
                            <Button loading={id === loadingTaskId} reversed>
                                Try
                            </Button>
                        ) : (
                            <CheckIcon className="Task-icon" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
