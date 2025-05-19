<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskItem extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'is_completed', 'task_list_id'];

    public function taskList(){
        return $this->belongsTo(TaskList::class);
    }
}
