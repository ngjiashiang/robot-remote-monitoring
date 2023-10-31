<?php

namespace App\Http\Controllers;

use App\Models\Robot;
use App\Models\RobotStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use App\Events\RobotStatusUpdated;
use PhpParser\Node\Stmt\TryCatch;

// $table->foreign('robot_id')->references('id')->on('robots')->onDelete('cascade');
// $table->integer('battery_level')->nullable();
// $table->string('current_task')->nullable();
// $table->string('error_code')->nullable();
// $table->string('data')->nullable();
class RobotController extends Controller
{
    public function updateStatus(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:robots,id',
            'private_key' => 'required',
            'battery_level' => 'sometimes|nullable|numeric',
            'current_task' => 'sometimes|nullable|string',
            'error_code' => 'sometimes|nullable|string',
            'data' => 'sometimes|nullable|string',
        ]);

        $robot = Robot::where('id', $validatedData['id'])->with('latestStatus')->first();
        
        if (!$robot || !Hash::check($validatedData['private_key'], $robot->private_key)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $robotStatus = new RobotStatus();
        $robotStatus->robot_id = $robot->id;
        $robotStatus->battery_level = $validatedData['battery_level'] ?? null;
        $robotStatus->current_task = $validatedData['current_task'] ?? null;
        $robotStatus->error_code = $validatedData['error_code'] ?? null;
        $robotStatus->data = $validatedData['data'] ?? null;
        $robotStatus->save();

        try {
            event(new RobotStatusUpdated($robot));
        } catch (\Throwable $th) {
        }
        
        return response()->json(['message' => 'Robot status saved'], 201);
    }

    public function getAllRobotsStatus(): JsonResponse
    {
        $data = RobotStatus::paginate(15);    
        return response()->json($data, 200);
    }

    public function getRobotStatus($id): JsonResponse
    {

        return response()->json(['message' => 'Robot status saved'], 201);
    }
}
