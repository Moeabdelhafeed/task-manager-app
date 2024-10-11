<?php

namespace App\Http\Controllers;

use App\Models\TaskItem;
use App\Http\Requests\StoreTaskItemRequest;
use App\Http\Requests\UpdateTaskItemRequest;
use App\Models\TaskList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskItemController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, TaskList $tasklist)
    {
        Gate::authorize('modify', $tasklist);

        $feilds = $request->validate([
            'name' => ['required','string','max:255'],
        ]);

        $taskitem  = $tasklist->taskItems()->create($feilds);

        return [
            'taskItem' => $taskitem,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskList $tasklist, TaskItem $taskitem)
    {
        Gate::authorize('modify', $tasklist);

        $feilds = $request->validate([
            'name' => ['string','max:255','min:1'],
            'is_completed' => ['boolean'],
            'task_list_id' => ['integer'],
        ]);

        $taskitem->update($feilds);

        return [
            'taskItem' => $taskitem,
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskList $tasklist, TaskItem $taskitem)
    {
        Gate::authorize('modify', $tasklist);

        $taskitem->delete();

        return [
           'message' => 'Task Item deleted successfully.',
        ];
    }
}
