<?php

namespace App\Http\Controllers;
use App\Models\Robot;
use App\Models\RobotStatus;
use Illuminate\Support\Benchmark;
use Illuminate\Support\Facades\Hash;
use App\Events\RobotStatusUpdated;

class BenchmarkingController extends Controller
{
    public function benchmarkFindRobot()
    {
        return Benchmark::dd(fn () => Robot::find(7), iterations: 10); // 0.1 ms
    }

    public function benchmarkWriteRobotStatusToDb()
    {
        return Benchmark::dd(fn () => RobotStatus::create([
            'robot_id' => 7,
            'battery_level' => 30,
            'current_task' => "Using a slightly longer string for testing",
            'error_code' => "Using a slightly longer string for testing",
            'data' => "using a very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong string for testing"
        ]), iterations: 10);
    }

    public function benchmarkBcrypt()
    {
        return Benchmark::dd(fn () => Hash::check("vkiazTky1hHZ89SKQ4fh", "$2y$10\$pB99iEJ/YmYwHBj2NKdJn.WmoZL1/ocSVe4K6FTZRNuR7kYph0Q56"), iterations: 10);
    }

    public function benchmarkWebSockets()
    {
        return Benchmark::dd(fn () => event(new RobotStatusUpdated((object)[
            'robot_id' => 7,
            'battery_level' => 30,
            'current_task' => "Using a slightly longer string for testing",
            'error_code' => "Using a slightly longer string for testing",
            'data' => "using a very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong string for testing"
        ])), iterations: 10);
    }
}
