<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('robot_statuses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('robot_id');
            $table->foreign('robot_id')->references('id')->on('robots')->onDelete('cascade');
            $table->integer('battery_level')->nullable();
            $table->string('current_task')->nullable();
            $table->string('error_code')->nullable();
            $table->string('data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('robot_statuses');
    }
};
