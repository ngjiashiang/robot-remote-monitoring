<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Robot;

class DashboardController extends Controller
{
    public function getDashboard(Request $request): Response
    {
        $robots = Robot::with('latestStatus')->orderBy('created_at', 'desc');
        
        $nameFilter = $request->has('name') ? $request->name : "";

        if ($request->has('name')) {
            $robots->where('name', 'like', '%' . $nameFilter . '%');
        }

        $robots = $robots->paginate(10)->withQueryString();

        return Inertia::render('Dashboard', [
            'robots' => $robots,
            'queried_name' => $nameFilter
        ]);
    }
}
