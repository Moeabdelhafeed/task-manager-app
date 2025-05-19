<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskItemController;
use App\Http\Controllers\TaskListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::apiResource('/tasklist' , TaskListController::class)->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::post('tasklist/{tasklist}/taskitem', [TaskItemController::class, 'store']);
    Route::delete('tasklist/{tasklist}/taskitem/{taskitem}', [TaskItemController::class, 'destroy']);
    Route::put('tasklist/{tasklist}/taskitem/{taskitem}', [TaskItemController::class, 'update']);
    
});