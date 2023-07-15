<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [DashboardController::class, 'getDashboard'])->name('dashboard');
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
});

require __DIR__.'/auth.php';
