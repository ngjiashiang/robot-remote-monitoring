<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RobotStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'robot_id',
        'battery_level',
        'current_task',
        'error_code',
        'data'
    ];

    public function robot(): BelongsTo
    {
        return $this->belongsTo(Robot::class);
    }
}
