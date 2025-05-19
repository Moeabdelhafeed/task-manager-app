<?php

namespace App\Http\Controllers;

use App\Models\TaskList;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskListRequest;
use App\Http\Requests\UpdateTaskListRequest;
use Illuminate\Support\Facades\Gate;

class TaskListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $taskLists = $request->user()->taskLists()->orderBy('created_at', 'desc')->get();
        return [
            'taskLists' => $taskLists->load('taskItems'),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $feilds = $request->validate([
            'name' => ['required','string','max:20'],
        ]);

        $taskList = $request->user()->taskLists()->create($feilds);

        return [
            'taskList' => $taskList->load('taskItems'),
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskList $tasklist)
    {

        Gate::authorize('modify', $tasklist);
        $feilds = $request->validate([
            'name' => ['string','max:255'],
        ]);

        $tasklist->update($feilds);

        return [
            'taskList' => $tasklist->load('taskItems'),
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskList $tasklist)
    {
        Gate::authorize('modify', $tasklist);

        $tasklist->taskItems()->delete();

        $tasklist->delete();

        return [
           'message' => 'Task List deleted successfully.',
        ];
    }
}
