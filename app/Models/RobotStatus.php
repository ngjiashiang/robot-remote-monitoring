<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RobotStatus extends Model
{
    use HasFactory;

    public function robot(): BelongsTo
    {
        return $this->belongsTo(Robot::class);
    }
}
