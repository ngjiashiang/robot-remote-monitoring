<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->password = Hash::make(env('ADMIN_PASSWORD', null));
        $user->email = env('ADMIN_EMAIL', null);
        $user->role = 'admin';
        $user->name = 'admin';
        $user->save();
    }
}
