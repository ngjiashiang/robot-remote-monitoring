<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('robots-status', function ($user) {
    return !is_null($user);
});

Broadcast::channel('robot-{robotId}-status', function ($user, $robotId) {
    return !is_null($user);
});
// Broadcast::channel('test_public', "aaaa");