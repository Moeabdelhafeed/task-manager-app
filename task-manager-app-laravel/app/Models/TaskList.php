<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    use HasFactory;

    protected $table = 'task_lists';

    protected $fillable = ['name'];

    public function taskItems(){
        return $this->hasMany(TaskItem::class, 'task_list_id', 'id' );
    }
}
