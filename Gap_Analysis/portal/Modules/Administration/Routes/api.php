<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/administration', function (Request $request) {
//     return $request->user();

// });
Route::group(['middleware' => 'auth:api', 'prefix' => 'administration', 'namespace' => 'Modules\Administration\Http\Controllers'], function()
{
    Route::get('getUsers', 'AdministrationController@getUsers');
    Route::post('onUserLogOut', 'AdministrationController@onUserLogOut');
    Route::get('onApplicationInitialisation', 'AdministrationController@onApplicationInitialisation');

});