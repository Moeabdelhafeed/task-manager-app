<?php

namespace App\Policies;

use App\Models\TaskList;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskListPolicy
{


    /**
     * Determine whether the user can view the model.
     */
    public function modify(User $user, TaskList $tasklist): Response
    {
        if ($tasklist->user_id === $user->id) {
            return Response::allow();
        }

        return Response::deny('You are not authorized to modify this task list.');
    }
}
