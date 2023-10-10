<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Robot extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'private_key',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'scheduled_maintainance_at' => 'datetime'
    ];

    public function statuses(): HasMany
    {
        return $this->hasMany(RobotStatus::class);
    }

    public function latestStatus(): HasOne
    {
        return $this->hasOne(RobotStatus::class)->latestOfMany();
    }
}
