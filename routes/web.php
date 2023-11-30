<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BenchmarkingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RobotController;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/', [DashboardController::class, 'getDashboard'])->name('dashboard');
    Route::get('/robot/{id}', [RobotController::class, 'getRobot'])->name('getRobot');

    Route::get('/jpi/robots', [RobotController::class, 'getAllRobotsStatus']);
    Route::get('/jpi/robot/{id}', [RobotController::class, 'getRobotStatus']);
});

Route::middleware('admin')->group(function () {
    Route::get('admin', [AdminController::class, 'getAdminDashboard'])
        ->name('getAdminDashboard');
    Route::get('/admin/manage-users', [AdminController::class, 'getUsers'])
        ->name('getUsers');
    Route::get('/admin/manage-robots', [AdminController::class, 'getRobots'])
        ->name('getRobots');

    Route::post('/admin/add-user', [AdminController::class, 'addUser'])
        ->name('addUser');
    Route::post('/admin/delete-user', [AdminController::class, 'deleteUser'])
        ->name('deleteUser');

    Route::post('/admin/add-robot', [AdminController::class, 'addRobot'])
        ->name('addRobot');
    Route::post('/admin/delete-robot', [AdminController::class, 'deleteRobot'])
        ->name('deleteRobot');
    
    Route::get('/admin/benchmark-find-robot', [BenchmarkingController::class, 'benchmarkFindRobot'])
        ->name('benchmarkFindRobot');
    Route::get('/admin/benchmark-write-robot-status-to-db', [BenchmarkingController::class, 'benchmarkWriteRobotStatusToDb'])
        ->name('benchmarkWriteRobotStatusToDb');
    Route::get('/admin/benchmark-bcrypt', [BenchmarkingController::class, 'benchmarkBcrypt'])
        ->name('benchmarkBcrypt');
    Route::get('/admin/benchmark-websockets', [BenchmarkingController::class, 'benchmarkWebSockets'])
        ->name('benchmarkWebSockets');
});

Route::get('robot-demo', [RobotController::class, 'getUpdateForm'])
    ->name('getRobotUpdateForm');

Route::get('/aaaa', [Controller::class, 'test']);

Route::get('/a', [Controller::class, 'show']);

require __DIR__.'/auth.php';
