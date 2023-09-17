<?php

namespace App\Http\Controllers;

use App\Models\Robot;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RobotController extends Controller
{
    public function putDemo(Request $request)
    {
        $robot = Robot::find($request->robot_id);
        
        if($robot->private_key != bcrypt($request->private_key)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $robot->status = $request->status;
        $robot->save();
        
        return response('Hello World', 200)
                  ->header('Content-Type', 'text/plain');
    }

    public function getUpdateForm(): Response
    {
        return Inertia::render('RobotForm');
    } 
}
