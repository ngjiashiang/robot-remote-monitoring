<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Robot;

class DashboardController extends Controller
{
    public function getDashboard(): Response
    {
        $robots = Robot::all();
        
        return Inertia::render('Dashboard', [
            'robots' => $robots,
        ]);
    }
}
