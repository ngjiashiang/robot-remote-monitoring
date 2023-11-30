<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Robot;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Display the admin page
     */
    public function getAdminDashboard(): Response
    {
        return Inertia::render('Admin/Dashboard');
    }

    /**
     * Display the manage users page
     */
    public function getUsers(): Response
    {
        $users = User::whereNull('role')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/ManageUsers', [
            'users' => $users,
        ]);
    }

    public function addUser(Request $request): RedirectResponse
    {
        $generatedPassword = Str::random(15);

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
        ]);

        User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($generatedPassword),
        ]);

        return redirect()->route("getUsers")->with([
            'message' => [
                'event' => 'new_user_registered_successfully',
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => $generatedPassword
            ]
        ]);
    }

    public function deleteUser(Request $request): RedirectResponse
    {
        $user = User::find($request->user_id);
        $user->forceDelete();

        return redirect()->route("getUsers");
    }

    public function getRobots(): Response
    {
        $robots = Robot::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/ManageRobots', [
            'robots' => $robots,
        ]);
    }

    public function addRobot(Request $request): RedirectResponse
    {
        $generatedPrivateKey = Str::random(20);
        
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string',
        ]);

        Robot::create([
            'name' => $validatedData['name'],
            'private_key' => bcrypt($generatedPrivateKey), //change to unique
        ]);

        return redirect()->route("getRobots")->with([
            'message' => [
                'event' => 'new_robot_added_successfully',
                'name' => $validatedData['name'],
                'private_key' => $generatedPrivateKey
            ]
        ]);
    }

    public function deleteRobot(Request $request): RedirectResponse
    {
        $robot = Robot::find($request->robot_id);
        $robot->forceDelete();

        return redirect()->route("getRobots");
    }

    public function getDocumentation(): Response
    {
        return Inertia::render('Admin/Documentation');
    }
}
